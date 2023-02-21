import type {
  BasicOptionsState,
  InitOptions,
  ApiOptions,
  StoreApiOptions,
  HttpHeader,
  UploadRequestOptions,
  EnvelopeApiOptions,
  EnvelopePayloadHeaderOptions,
  EnvelopePayloadItemOptions,
  SentryCaptureOptions,
  UserOptions
} from './types/index'
import { outputMsg } from './utils/console'
import { isSupportedFetch } from './utils/env'
import { getDataType } from './utils/data-type'
// Sentry DSN 正则
const dsnReg = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/
// Sentry SDK 版本号
const sdkVersion = '1.0.0'
// Sentry SDK 名称
const sdkName = 'sentry.javascript.browser'
// Sentry SDK 基本配置项
const basicOptions: BasicOptionsState = {
  dsn: '',
  enabled: true,
  platform: 'javascript',
  level: 'error',
  serverName: window.location.hostname,
  environment: 'production',
  envelope: false,
  request: {
    method: 'GET',
    url: window.location.href,
    headers: {
      'User-Agent': window.navigator.userAgent
    }
  }
}
// 初始化的 Sentry Scope User 基本配置项
const initUserOptions: UserOptions = {
  ip_address: '{{auto}}'// 用户ip地址，此处默认为服务器自动获取
}
// Sentry Scope User 基本配置项
let userOptions: UserOptions = {
  ...initUserOptions
}
/**
 * @method 设置用户信息
 * @document https://develop.sentry.dev/sdk/event-payloads/user/
 */
function setUser(user: UserOptions) {
  userOptions = {
    ...userOptions,
    ...user
  }
}
/**
 * @method 清空所有Scope配置
 */
function clear() {
  userOptions = {
    ...initUserOptions
  }
}
/**
 * @method 使用全局的Scope
 */
export function withScope(callback: Function) {
  if (typeof callback !== 'function') {
    outputMsg('method "withScope" must pass a function variable, please check again!', 'error')
    return
  }
  callback({
    setUser,
    clear
  })
}
// 初始化SDK
export function init(options: InitOptions) {
  // 非法地配置项对象参数
  if (getDataType(options) !== 'Object') {
    outputMsg('method "init" must pass a object variable, please check again!', 'error')
    return
  }
  // 非法的dsn参数
  if (getDataType(options.dsn) !== 'String') {
    outputMsg('method "init" must pass the value of "dsn" on options params, please check again!', 'error')
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
}
/**
 * @method 解析DSN地址
 */
function parseDSN(): ApiOptions {
  // 非法的dns
  if (!basicOptions.dsn) {
    outputMsg('please check if the "init" method was called!', 'error')
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
  // 非法的日志信息
  if (getDataType(options) !== 'Object') {
    outputMsg('method "uploadLog" must pass a object variable, please check again!', 'error')
    return {
      url: '',
      headers: {},
      payload: ''
    }
  }
  // 构造请求头
  const headers: HttpHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  // 解构需要独立处理的配置项
  const { user = {}, request = {}, ...restOptions } = options
  // 构造基础数据
  const basicPayload: StoreApiOptions = {
    platform: basicOptions.platform,
    level: basicOptions.level,
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
    request: {
      ...basicOptions.request,
      ...request
    }
  }
  // 构造目标请求数据
  const payload = {
    ...basicPayload,
    ...restOptions
  } as StoreApiOptions
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
  // 非法的日志信息
  if (getDataType(options) !== 'Object') {
    outputMsg('method "uploadLog" must pass a object variable, please check again!', 'error')
    return {
      url: '',
      headers: {},
      payload: ''
    }
  }
  // 解构需要独立处理的配置项
  const { user = {}, request = {}, type = 'event', ...restOptions } = options
  const headers: HttpHeader = {}
  const basicPayload: EnvelopeApiOptions = {
    platform: basicOptions.platform,
    level: basicOptions.level,
    server_name: basicOptions.serverName,
    environment: basicOptions.environment,
    type: type,
    user: {
      ...userOptions,
      ...user
    },
    request: {
      ...basicOptions.request,
      ...request
    }
  }
  // 构造目标请求数据
  const targetPayload = {
    ...basicPayload,
    ...restOptions
  } as EnvelopeApiOptions
  const payloadHeaders: EnvelopePayloadHeaderOptions = {
    sent_at: new Date().toISOString(),
    sdk: {
      name: sdkName,
      version: sdkVersion
    }
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
 * @method 上传日志到日志服务器
 */
function uploadLog(options: SentryCaptureOptions) {
  // 非法的日志信息
  if (getDataType(options) !== 'Object') {
    outputMsg('method "uploadLog" must pass a object variable, please check again!', 'error');
    return;
  }
  const requestOptions: UploadRequestOptions  = basicOptions.envelope ? getEnvelopeOptions(options) : getStoreOptions(options)
  const url = requestOptions.url
  const headers: HttpHeader = requestOptions.headers
  const payload = requestOptions.payload
  // 支持fecth请求
  if (isSupportedFetch()) {
    fetch(url, {
      method: 'POST',
      referrerPolicy: 'origin',
      headers: headers as HeadersInit | undefined,
      body: payload,// body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then(res => {
      console.log('fetch result => ', res)
    })
    .catch(err => {
      console.log('fetch error => ', err)
    })
  } else {
    // 不支持fetch，使用原生XMLHttpRequest对象
    let xhr = new XMLHttpRequest()
    // xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        // var res = JSON.parse(xhr.response)
        console.log(xhr)
      }
    };
    xhr.open('POST', url)
    for (let key in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        xhr.setRequestHeader(key, headers[key])
      }
    }
    xhr.send(payload)
  }
}
/**
 * @method 捕获信息
 * @document basic options => https://develop.sentry.dev/sdk/event-payloads
 * @document message options => https://develop.sentry.dev/sdk/event-payloads/message/
 */
export function captureMessage(options: SentryCaptureOptions) {
  // 禁止上传日志
  if (!basicOptions.enabled) return
  // 非法地配置项对象参数
  if (getDataType(options) !== 'Object') {
    outputMsg('method "captureMessage" must pass a object variable, please check again!', 'error');
    return;
  }
  // 非法信息数据
  if (typeof options.message !== 'string' || options.message === '') {
    outputMsg('method "captureMessage" must pass the value of "message" on options params, please check again!', 'error');
    return;
  }
  // 上传日志
  uploadLog(options)
}
