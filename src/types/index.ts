/** log level */
export type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug'
/** string value object */
export type StringValueObject = Record<string, string>
/** any value object */
type AnyValueObject = Record<string, any>
/** Required initialization configuration */
interface RequiredInitOptions {
  /** Sentry log service DSN. */
  dsn: string
}
/** Optional initialization configuration */
interface OptionalInitOptions {
  /** Whether to allow data to be reported. */
  enabled: boolean
  /** Whether to use the envelope interface to report data. */
  envelope: boolean
  /** Whether to enable debug mode. */
  debug: boolean
  /** Environments that send log data, default value is "production". */
  environment: string
  /** Version number, suggested format my-project-name@1.0.0. */
  release: string
}
/** SDK basic initialization configuration */
export interface BasicInitOptions extends RequiredInitOptions, OptionalInitOptions {
  /** A string representing the platform the SDK is submitting from. */
  platform: string
  /** Log level, the available values are "fatal" | "error" | "warning" | "info" | "debug". */
  level: LogLevel
  /** Identifies the host from which the event was recorded. */
  serverName: string
}
/** SDK initialization configuration */
export type SentryInitOptions = RequiredInitOptions & Partial<OptionalInitOptions>
/** The object returned after parsing the DSN is completed. */
export interface ApiOptions {
  /** API address */
  uri: string
  /** Public Key */
  publicKey: string
  /** Project ID */
  projectId: string
}
/** tag parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/#optional-attributes" for details. */
export type TagOptions = StringValueObject
/** http-header field parameter configuration */
export type HttpHeader = StringValueObject
/** extra parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/#optional-attributes" for details. */
export type ExtraOptions = AnyValueObject
/** request parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/request/" for details. */
export interface RequestOptions {
  headers?: HttpHeader
  method?: string
  url?: string
  query_string?: string
  data?: AnyValueObject
  cookies?: string
  env?: AnyValueObject
}
/** user parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/user/" for details. */
export interface UserOptions {
  ip_address?: string
  id?: string | number
  username?: string
  email?: string
}
/** sdk parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/sdk/" for details. */
interface SDKOptions {
  name: string
  version: string
}
/** message parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/message/" for details. */
export interface MessageOptions {
  message?: string
  params?: string[]
}
/** statcktrace frames parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/stacktrace/#frame-attributes" for details. */
export interface StackTraceFrameItem {
  in_app?: boolean
  function: string
  filename: string
  lineno?: number
  colno?: number
  abs_path?: string
}
/** statcktrace parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/stacktrace/#attributes" for details. */
export interface StackTraceOptions {
  frames: StackTraceFrameItem[]
}
/** exception values parameter configuration */
export interface ExceptionItem {
  type: string
  value: string
  module?: string
  stacktrace?: StackTraceOptions
}
/** exception parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/exception/" for details. */
export interface ExceptionOptions {
  values: ExceptionItem[]
}
/** Optional base configuration */
interface OptionalBaseOptions {
  /** A string representing the platform the SDK is submitting from. */
  platform: string
  /** Log level, the available values are "fatal" | "error" | "warning" | "info" | "debug". */
  level: LogLevel
  /** Identifies the host from which the event was recorded. */
  server_name: string
  /** Environments that send log data, default value is "production". */
  environment: string
  /** Version number, suggested format my-project-name@1.0.0. */
  release: string
}
/** Optional interface configuration */
interface OptionalInterfaceOptions {
  user: UserOptions
  request: RequestOptions
  tags?: TagOptions
  extra?: ExtraOptions
}
/** API basic parameter */
export type BasicApiOptions = OptionalBaseOptions & OptionalInterfaceOptions
/** Store interface basic parameter, see the document "https://develop.sentry.dev/sdk/store/" for details. */
export interface StoreApiOptions extends BasicApiOptions {
  timestamp: string
  sdk: SDKOptions
}
/** Envelope interface basic parameter, see the document "https://develop.sentry.dev/sdk/envelopes/" for details. */
export interface EnvelopeApiOptions extends BasicApiOptions {
  type: string
  sent_at?: string
}
/** The header object of Envelope interface data, see the document "https://develop.sentry.dev/sdk/envelopes/#envelope-headers" for details. */
export interface EnvelopePayloadHeaderOptions {
  sent_at: string
  sdk: SDKOptions
  event_id?: string
  dsn?: string
}
/** The item object of Envelope interface data, see the document "https://develop.sentry.dev/sdk/envelopes/#items" for details. */
export interface EnvelopePayloadItemOptions {
  type: string
}
/** The configuration of Sentry log capture method */
export interface SentryCaptureOptions extends Partial<OptionalInterfaceOptions & Pick<OptionalBaseOptions, 'level'>> {
  message?: string | MessageOptions
  type?: string
  event_id?: string
  exception?: ExceptionOptions
}
/** Request configuration for log upload */
export interface UploadRequestOptions {
  url: string
  headers: HttpHeader
  payload: string
}
/** Sentry-related API interface response object */
interface SentryAPIResponse {
  id: string
}
/** Sentry SDK default return envelope */
export interface SentrySDKResponse {
  /** Error code */
  code: number
  /** Communication data */
  data: SentryAPIResponse | null
  /** Tip message */
  message: string
}
/** Http request extension configuration*/
export interface RequestExternalOptions {
  /** Maximum number of retry requests */
  maxRetries?: number
  /** Retry request delay time */
  retryDelay?: number
}
/** Custom Http response error object */
export interface CustomResponseError extends Error {
  status?: number
}
/** The global scope object */
export interface SentryScope {
  /** set user information */
  setUser: (options: UserOptions | null) => void
  /** set tags */
  setTag: (key: string, value: string) => void
  /** remove tag */
  removeTag: (key: string) => void
  /** set extra information */
  setExtra: (key: string, value: any) => void
  /** remove extra information */
  removeExtra: (key: string) => void
  /** set log level */
  setLevel: (level: LogLevel) => void
  /** Clear all scope configurations */
  clear: () => void
}
/** Callback function of global scope method */
export interface ConfigureScopeCallback extends Function {
  (scope: SentryScope): void
}
