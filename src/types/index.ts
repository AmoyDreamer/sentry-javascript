// 日志级别类型
export type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug'
// 必填配置项
export interface RequiredOptions {
  dsn: string// Sentry日志服务的dsn
}
// 可选配置项
export interface OptionalOptions {
  enabled: boolean// 是否上报数据到接口
  platform: string// 上报的SDK平台
  level: LogLevel// 日志级别，支持的值有fatal、error、warning、info、debug
  serverName: string// 记录事件来源的主机名
  environment: string// 环境，默认为生产环境
  envelope: boolean// 是否使用envelope相关接口
}
// request 参数配置项，具体可见配置文档 => https://develop.sentry.dev/sdk/event-payloads/request/
export interface RequestOptions {
  headers?: HttpHeader
  method?: string
  url?: string
  query_string?: string
  data?: any
  cookies?: string
  env?: any
}
// SDK 基本参数类型
export interface BasicOptionsState extends RequiredOptions , OptionalOptions {
  request: RequestOptions
}
// SDK 初始化配置项类型
export type InitOptions = RequiredOptions & Partial<OptionalOptions>
// 解析DSN完成后返回的对象
export interface ApiOptions {
  uri: string// api地址
  publicKey: string// 公钥
  projectId: string// 项目id
}
// user 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/user/
export interface UserOptions {
  ip_address?: string
  id?: string | number
  username?: string
  email?: string
}
// sdk 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/sdk/
export interface SDKOptions {
  name: string
  version: string
}
interface StringObject {
  [key: string]: string
}
// tag 参数配置项，具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/#optional-attributes
export type TagOptions = StringObject
// http-header字段参数配置项
export type HttpHeader = StringObject
// extra 参数配置项, 具体可见文档 => https://develop.sentry.dev/sdk/event-payloads/#optional-attributes
export interface ExtraOptions {
  [key: string]: any
}
// store接口基本参数类型
export interface BasicApiOptions {
  platform: string
  level: string
  server_name: string
  environment: string
  user: UserOptions
  request: RequestOptions
  tags?: TagOptions
  extra?: ExtraOptions
  event_id?: string
}
// store接口基本参数类型
export interface StoreApiOptions extends BasicApiOptions {
  timestamp: string
  sdk: SDKOptions
}
// envelope接口基本参数类型
export interface EnvelopeApiOptions extends BasicApiOptions {
  type: string
  sent_at?: string
}
// envelope接口数据的header对象类型
export interface EnvelopePayloadHeaderOptions {
  sent_at: string
  sdk: SDKOptions
}
// envelope接口数据的item对象类型
export interface EnvelopePayloadItemOptions {
  type: string
}
// Sentry SDK 配置项对象
export interface SentryCaptureOptions extends BasicApiOptions {
  message: string
  type?: string
}
// 日志上传的请求配置项目
export interface UploadRequestOptions {
  url: string
  headers: HttpHeader
  payload: string
}
