import type {
  BasicInitOptions,
  SentryInitOptions,
  ApiOptions,
  StoreApiOptions,
  HttpHeader,
  UploadRequestOptions,
  EnvelopeApiOptions,
  EnvelopePayloadHeaderOptions,
  EnvelopePayloadItemOptions,
  LogLevel,
  SentryCaptureOptions,
  UserOptions,
  TagOptions,
  ExtraOptions,
  ExceptionOptions,
  StackTraceFrameItem,
  RequestOptions,
  SentryScope,
  ConfigureScopeCallback
} from './types/index'
import { outputMsg } from './utils/console'
import { isObject } from './utils/type'
import { deepMerge } from './utils/object'
import { isOversized } from './utils/size'
import { request } from './utils/request'
import { parseResponse, parseError, getBadRequestResponse, getResponseByCode } from './utils/response'
import { CUSTOM_STATUS_DISABLE_UPLOAD_LOG, HTTP_STATUS_PAYLOAY_TOO_LARGE, ALLOW_LOG_LEVELS } from './constants'
import ErrorStackParser from 'error-stack-parser'
import type { StackFrame } from 'error-stack-parser'
/** Sentry DSN 正则 */
const dsnReg = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/
/** Sentry 项目版本号正则 */
const releaseReg = /^.+@\d+\.\d+\.\d+$/
/** Sentry SDK 版本号 */
const sdkVersion = '1.0.0'
/** Sentry SDK 名称 */
const sdkName = 'sentry.javascript.browser'
/** Sentry SDK 基本初始化配置项 */
const basicOptions: BasicInitOptions = {
  dsn: '',// Sentry DSN 配置
  enabled: true,// 是否允许数据上报
  debug: false,// 是否开启debug模式
  platform: 'javascript',// 数据来源平台
  level: 'error',// 数据级别
  serverName: window.location.hostname,// 标明记录事件的主机名
  environment: 'production',// 环境名称，默认为生产环境
  envelope: true// 是否使用envelope接口上报数据
}
/** 初始化的 Sentry Scope User 基本配置项 */
const initUserOptions: UserOptions = {
  ip_address: '{{auto}}'// 用户ip地址，此处默认为服务器自动获取
}
/** Sentry Scope User 配置项 */
let userOptions: UserOptions = {
  ...initUserOptions
}
/** Sentry Scope Tags 配置项 */
let tagOptions: TagOptions = {}
/** Sentry Scope Extra 配置项 */
let extraOptions: ExtraOptions = {}
/**
 * @method 获取request options
 */
function getRequestOptions(): RequestOptions {
  return {
    method: 'GET',
    url: window.location.href,
    headers: {
      Referer: window.document.referrer,
      'User-Agent': window.navigator.userAgent
    }
  }
}
/**
 * @method 设置用户信息
 * @document https://develop.sentry.dev/sdk/event-payloads/user/
 */
function setUser(options: UserOptions | null) {
  if (typeof options !== 'object') {
    outputMsg('Method "setUser" must pass a object parameter, please check again!', 'error')
    return
  }
  if (options) {
    userOptions = {
      ...userOptions,
      ...options
    }
  } else {
    userOptions = {
      ...initUserOptions
    }
  }
}
/**
 * @method 设置自定义标签信息
 */
function setTag(key: string, value: string) {
  if (typeof key !== 'string' || typeof value !== 'string') {
    outputMsg('Method "setTag" must pass two string parameter, please check again!', 'error')
    return
  }
  tagOptions[key] = value
}
/**
 * @method 移除自定义标签信息
 */
function removeTag(key: string) {
  if (typeof key !== 'string') {
    outputMsg('The parameter "key" of method "removeTag" must pass a string value, please check again!', 'error')
    return
  }
  delete tagOptions[key]
}
/**
 * @method 设置自定义扩展信息
 */
function setExtra(key: string, value: any) {
  if (typeof key !== 'string') {
    outputMsg('The parameter "key" of method "setExtra" must pass a string value, please check again!', 'error')
    return
  }
  extraOptions[key] = value
}
/**
 * @method 移除自定义扩展信息
 */
function removeExtra(key: string) {
  if (typeof key !== 'string') {
    outputMsg('The parameter "key" of method "removeExtra" must pass a string value, please check again!', 'error')
    return
  }
  delete extraOptions[key]
}
/**
 * @method 清空之前的 Scope User 配置
 */
function clearUserOptions() {
  userOptions = {
    ...initUserOptions
  }
}
/**
 * @method 清空之前的 Scope Tags 配置
 */
function clearTagOptions() {
  tagOptions = {}
}
/**
 * @method 清空之前的 Scope Extra 配置
 */
function clearExtraOptions() {
  extraOptions = {}
}
/**
 * @method 清空所有Scope配置
 */
function clear() {
  clearUserOptions()
  clearTagOptions()
  clearExtraOptions()
}
/**
 * @method 使用全局的Scope
 */
export function configureScope(callback: ConfigureScopeCallback) {
  if (typeof callback !== 'function') {
    outputMsg('Method "configureScope" must pass a function value on parameter "callback", please check again!', 'error')
    return
  }
  callback({
    setUser,
    setTag,
    removeTag,
    setExtra,
    removeExtra,
    clear
  } as SentryScope)
}
/**
 * @method 初始化SDK
 */
export function init(options: SentryInitOptions) {
  // 非法地配置项对象参数
  if (!isObject(options)) {
    outputMsg('Method "init" must pass a object value, please check again!', 'error')
    return
  }
  // 非法的dsn参数
  if (typeof options.dsn !== 'string') {
    outputMsg('Method "init" must pass the value of "dsn" on options params, please check again!', 'error')
    return
  }
  // 非法的dsn格式
  if (!dsnReg.test(options.dsn)) {
    outputMsg('"dsn" must be a valid value, please check again!', 'error')
    return
  }
  // 设置dsn
  basicOptions.dsn = options.dsn
  // 合法的enabled参数值
  if (typeof options.enabled === 'boolean') {
    basicOptions.enabled = options.enabled
  }
  // 合法的envelope参数值
  if (typeof options.envelope === 'boolean') {
    basicOptions.envelope = options.envelope
  }
  // 合法的debug参数值
  if (typeof options.debug === 'boolean') {
    basicOptions.debug = options.debug
  }
  // 合法的environment参数值
  if (typeof options.environment === 'string') {
    basicOptions.environment = options.environment
  }
  // release可选参数值校验
  if (typeof options.release === 'string') {
    // 非法的release参数值
    if (!releaseReg.test(options.release)) {
      outputMsg('The option parameter "release" in the method "init" must be a string in the format "my-project-name@1.0.0", please check again!', 'error')
      return
    }
    basicOptions.release = options.release
  }
}
/**
 * @method 解析DSN地址
 */
function parseDSN(): ApiOptions {
  // 非法的dns
  if (!basicOptions.dsn) {
    outputMsg('Please check if the "init" method was called!', 'error')
    return {
      uri: '',
      publicKey: '',
      projectId: ''
    }
  }
  const matches: string[] | null = dsnReg.exec(basicOptions.dsn)
  const nodes = matches ? matches.slice(1) : []
  // const [protocol, publicKey, _ = '', host, port = '', projectId] = nodes
  const protocol = nodes[0]
  const publicKey = nodes[1]
  const host = nodes[3]
  const port = nodes[4] || ''
  const projectId = nodes[5]
  return {
    uri: `${protocol}://${host}${port}/api/`,
    publicKey: publicKey,
    projectId: projectId
  }
}
/**
 * @method 获取api地址　
 */
function getAPIAddress(): string {
  const key: string = basicOptions.envelope ? 'envelope' : 'store'
  const basicRequestOptions: ApiOptions  = parseDSN()
  const url = `${basicRequestOptions.uri}${basicRequestOptions.projectId}/${key}/?sentry_version=7&sentry_client=${sdkName}${sdkVersion}&sentry_key=${basicRequestOptions.publicKey}`
  return url
}
/**
 * @method 获取store接口请求配置
 */
function getStoreOptions(options: SentryCaptureOptions) : UploadRequestOptions {
  // 构造请求头
  const headers: HttpHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  // 解构需要独立处理的配置项
  const {
    user = {},
    request = {},
    tags = {},
    extra = {},
    level,
    ...restOptions
  } = options
  // 构造目标请求数据
  const payload: StoreApiOptions = {
    platform: basicOptions.platform,
    level: typeof level === 'string' && ALLOW_LOG_LEVELS.includes(level) ? level : basicOptions.level,
    server_name: basicOptions.serverName,
    environment: basicOptions.environment,
    timestamp: new Date().toISOString(),
    user: {
      ...userOptions,
      ...user
    },
    sdk: {
      name: sdkName,
      version: sdkVersion
    },
    request: deepMerge(getRequestOptions(), request),
    tags: {
      ...tagOptions,
      ...tags
    },
    extra: deepMerge(extraOptions, extra),
    ...restOptions
  }
  return {
    url: getAPIAddress(),
    headers: headers,
    payload: JSON.stringify(payload)
  }
}
/**
 * @method 通过envelope接口请求配置
 * @document https://develop.sentry.dev/sdk/envelopes/#serialization-format
 */
function getEnvelopeOptions(options: SentryCaptureOptions): UploadRequestOptions {
  // 解构需要独立处理的配置项
  const {
    user = {},
    request = {},
    tags = {},
    extra = {},
    type = 'event',
    level,
    event_id = '',
    ...restOptions
  } = options
  const headers: HttpHeader = {}
  // 构造目标请求数据
  const targetPayload: EnvelopeApiOptions = {
    platform: basicOptions.platform,
    level: typeof level === 'string' && ALLOW_LOG_LEVELS.includes(level) ? level : basicOptions.level,
    server_name: basicOptions.serverName,
    environment: basicOptions.environment,
    type: type,
    user: {
      ...userOptions,
      ...user
    },
    request: deepMerge(getRequestOptions(), request),
    tags: {
      ...tagOptions,
      ...tags
    },
    extra: deepMerge(extraOptions, extra),
    ...restOptions
  }
  const payloadHeaders: EnvelopePayloadHeaderOptions = {
    sent_at: new Date().toISOString(),
    sdk: {
      name: sdkName,
      version: sdkVersion
    },
    ...(event_id && {event_id: event_id})
  }
  const payloadItem: EnvelopePayloadItemOptions = {
    type: type
  }
  const payload: string = JSON.stringify(payloadHeaders) + '\n' + JSON.stringify(payloadItem) + '\n' + JSON.stringify(targetPayload) + '\n'
  return {
    url: getAPIAddress(),
    headers: headers,
    payload: payload
  }
}
/**
 * @method 上传日志到服务器
 */
function uploadLog(options: SentryCaptureOptions) {
  const requestOptions: UploadRequestOptions = basicOptions.envelope ? getEnvelopeOptions(options) : getStoreOptions(options)
  const url = requestOptions.url
  const headers: HttpHeader = requestOptions.headers
  const payload = requestOptions.payload
  // 上传的日志内容超出限制大小
  if (isOversized(payload)) {
    const res = getResponseByCode(HTTP_STATUS_PAYLOAY_TOO_LARGE)
    outputMsg(res.message, 'error')
    return res
  }
  // 发送相关数据到服务器
  return request(url, {
    method: 'POST',
    headers: headers,
    body: payload
  })
  .then(parseResponse)
  .catch(parseError)
}
/**
 * @method 捕获信息
 * @document basic options => https://develop.sentry.dev/sdk/event-payloads
 * @document message options => https://develop.sentry.dev/sdk/event-payloads/message/
 */
export function captureMessage(message: string, options?: LogLevel | SentryCaptureOptions) {
  // 禁止上传日志
  if (!basicOptions.enabled) return getResponseByCode(CUSTOM_STATUS_DISABLE_UPLOAD_LOG)
  // 非法信息数据
  if (typeof message !== 'string' || message === '') {
    const errMsg = 'Method "captureMessage" must pass a valid string value on parameter "message", please check again!'
    outputMsg(errMsg, 'error')
    return getBadRequestResponse(errMsg)
  }
  // 预设配置
  const presetOptions: SentryCaptureOptions = {
    level: 'info'
  }
  // 如果没有可选配置项，直接抛数据
  if (typeof options === 'undefined') {
    // 上传日志
    return uploadLog({
      message: message,
      ...presetOptions
    })
  }
  // 如果有可选配置项，且为字符串，则确认是不是正确的日志级别配置
  if (typeof options === 'string') {
    // 如果是允许设置的日志级别，则更新
    if (ALLOW_LOG_LEVELS.includes(options)) {
      presetOptions.level = options
    }
    // 上传日志
    return uploadLog({
      message: message,
      ...presetOptions
    })
  }
  // 非法地配置项对象参数
  if (!isObject(options)) {
    const errMsg = 'Method "captureMessage" must pass a string or object value on parameter "options", please check again!'
    outputMsg(errMsg, 'error')
    return getBadRequestResponse(errMsg)
  }
  // 存在可选配置项，则特殊处理message参数
  const { message: msg = message, ...restOptions } = options
  // 上传日志
  return uploadLog({
    message: msg,
    ...presetOptions,
    ...restOptions
  })
}
/**
 * @method 捕获异常
 */
export function captureException(err: Error, options?: SentryCaptureOptions) {
  // 禁止上传日志
  if (!basicOptions.enabled) return getResponseByCode(CUSTOM_STATUS_DISABLE_UPLOAD_LOG)
  // 非法的err配置项
  if (typeof err !== 'object' || !(err instanceof Error)) {
    const errMsg = 'Method "captureException" must pass a stantard instance of Error class on parameter "err", please check again!'
    outputMsg(errMsg, 'error')
    return getBadRequestResponse(errMsg)
  }
  // 解析获取堆栈
  const stackFrames: StackFrame[] = ErrorStackParser.parse(err)
  let frames: StackTraceFrameItem[] = []
  // 存在有堆栈的场景下格式化堆栈信息
  if (stackFrames.length > 0) {
    frames = stackFrames.map((item: StackFrame) => ({
      function: item.functionName || '',
      filename: item.fileName || '',
      abs_path: item.fileName || '',
      lineno: item.lineNumber,
      colno: item.columnNumber,
      in_app: true
    }))
  }
  const exceptionOption: ExceptionOptions = {
    values: [{
      type: err.name,
      value: err.message,
      stacktrace: {
        frames
      }
    }]
  }
  // 如果没有可选配置项，直接抛数据
  if (typeof options === 'undefined') {
    // 上传日志
    return uploadLog({
      exception: exceptionOption
    })
  }
  // 非法地配置项对象参数
  if (!isObject(options)) {
    const errMsg = 'Method "captureException" must pass a object value on parameter "options", please check again!'
    outputMsg(errMsg, 'error')
    return getBadRequestResponse(errMsg)
  }
  // 存在可选配置项，则特殊处理exception参数
  const { exception = {}, ...restOptions } = options
  // 上传日志
  return uploadLog({
    exception: {
      ...exceptionOption,
      ...exception
    },
    ...restOptions
  })
}
