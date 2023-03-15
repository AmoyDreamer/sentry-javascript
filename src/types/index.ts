import { ALLOW_LOG_LEVELS } from '../constants'
/** 日志级别类型 */
export type LogLevel = typeof ALLOW_LOG_LEVELS[number]
/** 字符串值对象 */
export type StringValueObject = Record<string, string>
/** 任意类型值对象 */
type AnyValueObject = Record<string, any>
/** 必填的初始化配置项 */
interface RequiredInitOptions {
  /** Sentry日志服务的dsn */
  dsn: string
}
/** 可选的初始化配置项 */
interface OptionalInitOptions {
  /** 是否上报数据到接口 */
  enabled: boolean
  /** 是否使用envelope相关接口 */
  envelope: boolean
  /** 是否开启debug模式 */
  debug: boolean
  /** 环境，默认为生产环境 */
  environment: string
  /** 版本号 */
  release?: string
}
/** SDK 基本的初始化配置项类型 */
export interface BasicInitOptions extends RequiredInitOptions, OptionalInitOptions {
  /** 上报的SDK平台 */
  platform: string
  /** 日志级别，支持的值有fatal、error、warning、info、debug */
  level: LogLevel
  /** 记录事件来源的主机名 */
  serverName: string
}
/** SDK 初始化配置项类型 */
export type SentryInitOptions = RequiredInitOptions & Partial<OptionalInitOptions>
/** 解析DSN完成后返回的对象 */
export interface ApiOptions {
  /** api地址 */
  uri: string
  /** 公钥 */
  publicKey: string
  /** 项目id */
  projectId: string
}
/** tag 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/#optional-attributes */
export type TagOptions = StringValueObject
/** http-header字段参数配置项 */
export type HttpHeader = StringValueObject
/** extra 参数配置项, 具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/#optional-attributes */
export type ExtraOptions = AnyValueObject
/** request 参数配置项，具体可见配置文档 => https://develop.sentry.dev/sdk/event-payloads/request/ */
export interface RequestOptions {
  headers?: HttpHeader
  method?: string
  url?: string
  query_string?: string
  data?: AnyValueObject
  cookies?: string
  env?: AnyValueObject
}
/** user 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/user/ */
export interface UserOptions {
  ip_address?: string
  id?: string | number
  username?: string
  email?: string
}
/** sdk 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/sdk/ */
interface SDKOptions {
  name: string
  version: string
}
/** message 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/message/ */
export interface MessageOptions {
  message?: string
  params?: string[]
}
/** statcktrace frames 参数配置项对象，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/stacktrace/#frame-attributes */
export interface StackTraceFrameItem {
  in_app?: boolean
  function: string
  filename: string
  lineno?: number
  colno?: number
  abs_path?: string
}
/** statcktrace 参数配置项对象，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/stacktrace/#attributes */
export interface StackTraceOptions {
  frames: StackTraceFrameItem[]
}
/** exception values 参数配置项对象 */
export interface ExceptionItem {
  type: string
  value: string
  module?: string
  stacktrace?: StackTraceOptions
}
/** exception 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/exception/ */
export interface ExceptionOptions {
  values: ExceptionItem[]
}
/** 可选的基础配置项 */
interface OptionalBaseOptions {
  /** 上报的SDK平台 */
  platform: string
  /** 日志级别，支持的值有fatal、error、warning、info、debug */
  level: LogLevel
  /** 记录事件来源的主机名 */
  server_name: string
  /** 环境，默认为生产环境 */
  environment: string
}
/** 可选的接口配置项 */
interface OptionalInterfaceOptions {
  user: UserOptions
  request: RequestOptions
  tags?: TagOptions
  extra?: ExtraOptions
}
/** API基本参数类型 */
export type BasicApiOptions = OptionalBaseOptions & OptionalInterfaceOptions
/** store接口基本参数类型，具体可见文档 => https://develop.sentry.dev/sdk/store/ */
export interface StoreApiOptions extends BasicApiOptions {
  timestamp: string
  sdk: SDKOptions
}
/** envelope接口基本参数类型，具体可见文档 => https://develop.sentry.dev/sdk/envelopes/ */
export interface EnvelopeApiOptions extends BasicApiOptions {
  type: string
  sent_at?: string
}
/** envelope接口数据的header对象类型，具体可见文档 => https://develop.sentry.dev/sdk/envelopes/#envelope-headers */
export interface EnvelopePayloadHeaderOptions {
  sent_at: string
  sdk: SDKOptions
  event_id?: string
  dsn?: string
}
/** envelope接口数据的item对象类型，具体可见文档 => https://develop.sentry.dev/sdk/envelopes/#items */
export interface EnvelopePayloadItemOptions {
  type: string
}
/** Sentry日志捕获方法配置项对象 */
export interface SentryCaptureOptions extends Partial<OptionalInterfaceOptions & Pick<OptionalBaseOptions, 'level'>> {
  message?: string | MessageOptions
  type?: string
  event_id?: string
  exception?: ExceptionOptions
}
/** 日志上传的请求配置项对象 */
export interface UploadRequestOptions {
  url: string
  headers: HttpHeader
  payload: string
}
/** Sentry相关API接口回调对象 */
interface SentryAPIResponse {
  id: string
}
/** SDK默认返回的信封 */
export interface SentrySDKResponse {
  /** 错误码 */
  code: number
  /** 传送的数据 */
  data: SentryAPIResponse | null
  /** 提示信息 */
  message: string
}
/** Http请求扩展配置*/
export interface RequestExternalOptions {
  /** 最大重试请求次数 */
  maxRetries?: number
  /** 重试请求延迟时间 */
  retryDelay?: number
}
/** 自定义的Http响应错误对象 */
export interface CustomResponseError extends Error {
  status?: number
}
/** 全局的Scope对象 */
export interface SentryScope {
  /** 设置用户信息 */
  setUser: (options: UserOptions | null) => void
  /** 设置自定义标签信息 */
  setTag: (key: string, value: string) => void
  /** 移除自定义标签信息 */
  removeTag: (key: string) => void
  /** 设置自定义扩展信息 */
  setExtra: (key: string, value: any) => void
  /** 移除自定义扩展信息 */
  removeExtra: (key: string) => void
  /** 清空所有Scope配置 */
  clear: () => void
}
/** 全局scope方法的回调函数类型 */
export interface ConfigureScopeCallback extends Function {
  (scope: SentryScope): void
}
