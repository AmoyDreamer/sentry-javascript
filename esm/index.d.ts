/** 日志级别类型 */
type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug'
/** 字符串值对象 */
type StringValueObject = Record<string, string>
/** 任意类型值对象 */
type AnyValueObject = Record<string, any>
/** 必填配置项 */
interface RequiredOptions {
  /** Sentry日志服务的dsn */
  dsn: string
}
/** 可选配置项 */
interface OptionalOptions {
  /** 是否上报数据到接口 */
  enabled: boolean
  /** 上报的SDK平台 */
  platform: string
  /** 日志级别，支持的值有fatal、error、warning、info、debug */
  level: LogLevel
  /** 记录事件来源的主机名 */
  serverName: string
  /** 环境，默认为生产环境 */
  environment: string
  /** 是否使用envelope相关接口 */
  envelope: boolean
}
/** request 参数配置项，具体可见配置文档 => https://develop.sentry.dev/sdk/event-payloads/request/ */
interface RequestOptions {
  headers?: HttpHeader
  method?: string
  url?: string
  query_string?: string
  data?: AnyValueObject
  cookies?: string
  env?: AnyValueObject
}
/** SDK 初始化配置项类型 */
type InitOptions = RequiredOptions & Partial<OptionalOptions>
/** user 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/user/ */
interface UserOptions {
  ip_address?: string
  id?: string | number
  username?: string
  email?: string
}
/** tag 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/#optional-attributes */
type TagOptions = StringValueObject
/** http-header字段参数配置项 */
type HttpHeader = StringValueObject
/** extra 参数配置项, 具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/#optional-attributes */
type ExtraOptions = AnyValueObject
/** message 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/message/ */
interface MessageOptions {
  message?: string
  params?: string[]
}
/** statcktrace frames 参数配置项对象，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/stacktrace/#frame-attributes */
interface StackTraceFrameItem {
  in_app?: boolean
  function: string
  filename: string
  lineno?: number
  colno?: number
  abs_path?: string
}
/** statcktrace 参数配置项对象，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/stacktrace/#attributes */
interface StackTraceOptions {
  frames: StackTraceFrameItem[]
}
/** exception values 参数配置项对象 */
interface ExceptionItem {
  type: string
  value: string
  module?: string
  stacktrace?: StackTraceOptions
}
/** exception 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/exception/ */
interface ExceptionOptions {
  values: ExceptionItem[]
}
/** API基本参数类型 */
interface BasicApiOptions {
  platform: string
  level: string
  server_name: string
  environment: string
  user: UserOptions
  request: RequestOptions
  tags?: TagOptions
  extra?: ExtraOptions
}
/** Sentry日志捕获方法配置项对象 */
interface SentryCaptureOptions extends Partial<BasicApiOptions> {
  message?: string | MessageOptions
  type?: string
  event_id?: string
  exception?: ExceptionOptions
}
/** Sentry相关API接口回调对象 */
interface SentryAPIResponse {
  id: string
}
/** SDK默认返回的信封 */
interface SentrySDKResponse {
  /** 错误码 */
  code: number
  /** 传送的数据 */
  data: SentryAPIResponse | null
  /** 提示信息 */
  message: string
}

declare module 'sentry-js-sdk' {
  export function init(options: InitOptions): void
  export function configureScope(callback: Function): void
  export function captureMessage(message: string, options?: SentryCaptureOptions): Promise<any> | void
  export function captureException(err: Error, options?: SentryCaptureOptions): Promise<any> | void
}

export { ExceptionOptions, ExtraOptions, InitOptions, RequestOptions, SentryCaptureOptions, SentrySDKResponse, TagOptions, UserOptions };
