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
import { CUSTOM_STATUS_DISABLE_UPLOAD_LOG, HTTP_STATUS_PAYLOAY_TOO_LARGE } from './constants'
import ErrorStackParser from 'error-stack-parser'
import type { StackFrame } from 'error-stack-parser'
/** Log levels allowed to be set */
const allowLogLevels = ['fatal', 'error', 'warning', 'info', 'debug']
/** The regular expression of Sentry DSN */
const dsnReg = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/
/** The regular expression of Sentry project version number */
const releaseReg = /^.+@\d+\.\d+\.\d+$/
/** Sentry SDK version */
const sdkVersion = '1.0.1'
/** Sentry SDK name */
const sdkName = 'sentry.javascript.browser'
/** Sentry SDK basic initialization configuration */
const basicOptions: BasicInitOptions = {
  dsn: '',// Sentry log service DSN.
  enabled: true,// Whether to allow data to be reported.
  debug: false,// Whether to enable debug mode.
  platform: 'javascript',// A string representing the platform the SDK is submitting from.
  level: 'error',// Log level, the available values are "fatal" | "error" | "warning" | "info" | "debug".
  serverName: window.location.hostname,// Identifies the host from which the event was recorded.
  environment: 'production',// Environments that send log data, default value is "production".
  envelope: true,// Whether to use the envelope interface to report data.
  release: ''// Version number, suggested format my-project-name@1.0.0.
}
/** Initialized Sentry scope user basic configuration */
const initUserOptions: UserOptions = {
  ip_address: '{{auto}}'// User ip address, where the default is automatically obtained by the server.
}
/** Sentry scope user configuration */
let userOptions: UserOptions = {
  ...initUserOptions
}
/** Sentry scope tags configuration */
let tagOptions: TagOptions = {}
/** Sentry scope extra information configuration */
let extraOptions: ExtraOptions = {}
/** Sentry scope optional log level */
let optionalLevel = ''
/**
 * @method Get request configuration
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
 * @method Set user information
 * @document https://develop.sentry.dev/sdk/event-payloads/user/
 */
function setUser(options: UserOptions | null) {
  if (typeof options !== 'object') {
    basicOptions.debug && outputMsg('Method "setUser" must pass a object parameter, please check again!', 'error')
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
 * @method Set tags
 */
function setTag(key: string, value: string) {
  if (typeof key !== 'string' || typeof value !== 'string') {
    basicOptions.debug && outputMsg('Method "setTag" must pass two string parameter, please check again!', 'error')
    return
  }
  tagOptions[key] = value
}
/**
 * @method Remove Tags
 */
function removeTag(key: string) {
  if (typeof key !== 'string') {
    basicOptions.debug && outputMsg('The parameter "key" of method "removeTag" must pass a string value, please check again!', 'error')
    return
  }
  delete tagOptions[key]
}
/**
 * @method Set extra information
 */
function setExtra(key: string, value: any) {
  if (typeof key !== 'string') {
    basicOptions.debug && outputMsg('The parameter "key" of method "setExtra" must pass a string value, please check again!', 'error')
    return
  }
  extraOptions[key] = value
}
/**
 * @method Remove extra information
 */
function removeExtra(key: string) {
  if (typeof key !== 'string') {
    basicOptions.debug && outputMsg('The parameter "key" of method "removeExtra" must pass a string value, please check again!', 'error')
    return
  }
  delete extraOptions[key]
}
/**
 * @method Set log level
 */
function setLevel(level: LogLevel) {
  if (!allowLogLevels.includes(level)) {
    basicOptions.debug && outputMsg('The parameter "level" of method "setLevel" must pass a valid string value, please check again!', 'error')
    return
  }
  optionalLevel = level
}
/**
 * @method Clear scope user configuration
 */
function clearUserOptions() {
  userOptions = {
    ...initUserOptions
  }
}
/**
 * @method Clear scope tag configuration
 */
function clearTagOptions() {
  tagOptions = {}
}
/**
 * @method Clear scope extra configuration
 */
function clearExtraOptions() {
  extraOptions = {}
}
/**
 * @method Clear scope log level
 */
function clearLevel() {
  optionalLevel = ''
}
/**
 * @method Clear all scope configurations
 */
function clear() {
  // Clear scope log level
  clearLevel()
  // Clear scope user configuration
  clearUserOptions()
  // Clear scope tag configuration
  clearTagOptions()
  // Clear scope extra configuration
  clearExtraOptions()
}
/**
 * @method Using the global scope
 */
export function configureScope(callback: ConfigureScopeCallback) {
  if (typeof callback !== 'function') {
    basicOptions.debug && outputMsg('Method "configureScope" must pass a function value on parameter "callback", please check again!', 'error')
    return
  }
  const scope: SentryScope = {
    setUser,
    setTag,
    removeTag,
    setExtra,
    removeExtra,
    setLevel,
    clear
  }
  callback(scope)
}
/**
 * @method Initializing Sentry SDK
 */
export function init(options: SentryInitOptions) {
  // Illegal configuration item object parameter
  if (!isObject(options)) {
    basicOptions.debug && outputMsg('Method "init" must pass a object value, please check again!', 'error')
    return
  }
  // Illegal dsn parameter
  if (typeof options.dsn !== 'string') {
    basicOptions.debug && outputMsg('Method "init" must pass the value of "dsn" on options params, please check again!', 'error')
    return
  }
  // Illegal dsn format
  if (!dsnReg.test(options.dsn)) {
    basicOptions.debug && outputMsg('"dsn" must be a valid value, please check again!', 'error')
    return
  }
  // Set dsn
  basicOptions.dsn = options.dsn
  // Valid enabled parameter value
  if (typeof options.enabled === 'boolean') {
    basicOptions.enabled = options.enabled
  }
  // Valid envelope parameter value
  if (typeof options.envelope === 'boolean') {
    basicOptions.envelope = options.envelope
  }
  // Valid debug parameter value
  if (typeof options.debug === 'boolean') {
    basicOptions.debug = options.debug
  }
  // Valid environment parameter value
  if (typeof options.environment === 'string') {
    basicOptions.environment = options.environment
  }
  // The verification of release optional parameter value
  if (typeof options.release === 'string') {
    // Valid release parameter value
    if (!releaseReg.test(options.release)) {
      basicOptions.debug && outputMsg('The option parameter "release" in the method "init" must be a string in the format "my-project-name@1.0.0", please check again!', 'error')
      return
    }
    basicOptions.release = options.release
  }
}
/**
 * @method Parse DSN address
 */
function parseDSN(): ApiOptions {
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
 * @method Get API address
 */
function getAPIAddress(): string {
  const key: string = basicOptions.envelope ? 'envelope' : 'store'
  const basicRequestOptions: ApiOptions  = parseDSN()
  const url = `${basicRequestOptions.uri}${basicRequestOptions.projectId}/${key}/?sentry_version=7&sentry_client=${sdkName}${sdkVersion}&sentry_key=${basicRequestOptions.publicKey}`
  return url
}
/**
 * @method Get store interface request configuration
 */
function getStoreOptions(options: SentryCaptureOptions) : UploadRequestOptions {
  // Constructing request headers
  const headers: HttpHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  // Deconstruct configuration items that need to be handled independently
  const {
    user = {},
    request = {},
    tags = {},
    extra = {},
    level,
    ...restOptions
  } = options
  // Constructing target request data
  const payload: StoreApiOptions = {
    platform: basicOptions.platform,
    level: typeof level === 'string' && allowLogLevels.includes(level) ? level : (optionalLevel || basicOptions.level) as LogLevel,
    server_name: basicOptions.serverName,
    environment: basicOptions.environment,
    release: basicOptions.release,
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
 * @method Get envelope interface request configuration
 * @document https://develop.sentry.dev/sdk/envelopes/#serialization-format
 */
function getEnvelopeOptions(options: SentryCaptureOptions): UploadRequestOptions {
  // Deconstruct configuration items that need to be handled independently
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
  // Constructing target request data
  const targetPayload: EnvelopeApiOptions = {
    platform: basicOptions.platform,
    level: typeof level === 'string' && allowLogLevels.includes(level) ? level : (optionalLevel || basicOptions.level) as LogLevel,
    server_name: basicOptions.serverName,
    environment: basicOptions.environment,
    release: basicOptions.release,
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
 * @method Upload logs to the server
 */
async function uploadLog(options: SentryCaptureOptions) {
  const requestOptions: UploadRequestOptions = basicOptions.envelope ? getEnvelopeOptions(options) : getStoreOptions(options)
  const url = requestOptions.url
  const headers: HttpHeader = requestOptions.headers
  const payload = requestOptions.payload
  // The uploaded log content exceeds the size limit
  if (isOversized(payload)) {
    const res = getResponseByCode(HTTP_STATUS_PAYLOAY_TOO_LARGE)
    basicOptions.debug && outputMsg(res.message, 'error')
    return Promise.resolve(res)
  }
  // Sending relevant data to the server
  return request(url, {
    method: 'POST',
    headers: headers,
    body: payload
  })
  .then(parseResponse)
  .catch(parseError)
}
/**
 * @method Capture message
 * @document basic options => https://develop.sentry.dev/sdk/event-payloads
 * @document message options => https://develop.sentry.dev/sdk/event-payloads/message/
 */
export function captureMessage(message: string, options?: LogLevel | SentryCaptureOptions) {
  // If dsn is not configured, uploading is disabled
  if (!basicOptions.dsn) {
    const errMsg = 'Please check if the "init" method was called!'
    basicOptions.debug && outputMsg(errMsg, 'error')
    return Promise.resolve(getBadRequestResponse(errMsg))
  }
  // Disable uploading logs
  if (!basicOptions.enabled) {
    const res = getResponseByCode(CUSTOM_STATUS_DISABLE_UPLOAD_LOG)
    basicOptions.debug && outputMsg(res.message, 'warn')
    return Promise.resolve(res)
  }
  // Illegal information data
  if (typeof message !== 'string' || message === '') {
    const errMsg = 'Method "captureMessage" must pass a valid string value on parameter "message", please check again!'
    basicOptions.debug && outputMsg(errMsg, 'error')
    return Promise.resolve(getBadRequestResponse(errMsg))
  }
  // Preset configuration
  const presetOptions: SentryCaptureOptions = {
    level: (optionalLevel || 'info') as LogLevel
  }
  // If there is no optional configuration, send directly data.
  if (typeof options === 'undefined') {
    // upload log
    return uploadLog({
      message: message,
      ...presetOptions
    })
  }
  // If there is an optional configuration item and it is a string, confirm that it is the correct log level configuration.
  if (typeof options === 'string') {
    // If log level is allowed to be set, update the configuration.
    if (allowLogLevels.includes(options)) {
      presetOptions.level = options
    }
    // upload log
    return uploadLog({
      message: message,
      ...presetOptions
    })
  }
  // Illegal configuration parameter
  if (!isObject(options)) {
    const errMsg = 'Method "captureMessage" must pass a string or object value on parameter "options", please check again!'
    basicOptions.debug && outputMsg(errMsg, 'error')
    return Promise.resolve(getBadRequestResponse(errMsg))
  }
  // If an optional configuration item exists, the message parameter is handled specially.
  const { message: msg = message, ...restOptions } = options
  // upload log
  return uploadLog({
    message: msg,
    ...presetOptions,
    ...restOptions
  })
}
/**
 * @method Capture exception
 */
export function captureException(err: Error, options?: SentryCaptureOptions) {
  // If dsn is not configured, uploading is disabled
  if (!basicOptions.dsn) {
    const errMsg = 'Please check if the "init" method was called!'
    basicOptions.debug && outputMsg(errMsg, 'error')
    return Promise.resolve(getBadRequestResponse(errMsg))
  }
  // Disable uploading logs
  if (!basicOptions.enabled) {
    const res = getResponseByCode(CUSTOM_STATUS_DISABLE_UPLOAD_LOG)
    basicOptions.debug && outputMsg(res.message, 'warn')
    return Promise.resolve(res)
  }
  // Illegal err parameter value
  if (typeof err !== 'object' || !(err instanceof Error)) {
    const errMsg = 'Method "captureException" must pass a stantard instance of Error class on parameter "err", please check again!'
    basicOptions.debug && outputMsg(errMsg, 'error')
    return Promise.resolve(getBadRequestResponse(errMsg))
  }
  // Parsing to get the stack
  const stackFrames: StackFrame[] = ErrorStackParser.parse(err)
  let frames: StackTraceFrameItem[] = []
  // Formatting stack information if a stack exists
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
  // If there is no optional configuration, send directly data.
  if (typeof options === 'undefined') {
    // upload log
    return uploadLog({
      exception: exceptionOption
    })
  }
  // Illegal configuration parameter
  if (!isObject(options)) {
    const errMsg = 'Method "captureException" must pass a object value on parameter "options", please check again!'
    basicOptions.debug && outputMsg(errMsg, 'error')
    return Promise.resolve(getBadRequestResponse(errMsg))
  }
  // If an optional configuration item exists, the exception parameter is handled specially.
  const { exception = {}, ...restOptions } = options
  // upload log
  return uploadLog({
    exception: {
      ...exceptionOption,
      ...exception
    },
    ...restOptions
  })
}
