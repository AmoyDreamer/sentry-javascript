// 日志级别类型
export type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug'
// 日志基本参数类型
export interface BasicOptionsState {
  dsn: string// Sentry日志服务的dsn
  enabled: boolean// 是否上报数据到接口
  platform: string// 上报的SDK平台
  level: LogLevel// 日志级别，支持的值有fatal、error、warning、info、debug
  serverName: string// 记录事件来源的主机名
  environment: string// 环境，默认为生产环境
  envelope: boolean// 是否使用envelope相关接口
}
// 解析DSN完成后返回的对象
export interface ApiOptions {
  uri: string// api地址
  publicKey: string// 公钥
  projectId: string// 项目id
}
// user 参数配置项
export interface UserOption {
  ip_address?: string
}
// sdk 参数配置项
export interface SDKOption {
  name: string
  version: string
}
// http-header字段参数配置项
export interface HttpHeader {
  [key: string]: string
}
// request 参数配置项
export interface RequestOption {
  headers: HttpHeader
}
// store接口基本参数类型
export interface BasicApiOptions {
  platform: string
  level: string
  server_name: string
  environment: string
  user: UserOption,
  sdk: SDKOption,
  request: RequestOption
}
// store接口基本参数类型
export interface StoreApiOptions extends BasicApiOptions {
  timestamp: string
}
// envelope接口基本参数类型
export interface EnvelopeApiOptions extends BasicApiOptions {
  type: string
  sent_at?: string
}
// envelope接口数据的header对象类型
export interface EnvelopePayloadHeaderOptions {
  sent_at: string
  sdk: SDKOption
}
// envelope接口数据的item对象类型
export interface EnvelopePayloadItemOptions {
  type: string
}
// Sentry SDK 配置项对象
export interface SentryCaptureOptions extends BasicApiOptions {
  message: string
}
// 日志上传的请求配置项目
export interface UploadRequestOptions {
  url: string
  headers: HttpHeader
  payload: string
}
