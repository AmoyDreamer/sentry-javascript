/** log level */
type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug'
/** string value object */
type StringValueObject = Record<string, string>
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
/** SDK initialization configuration */
type SentryInitOptions = RequiredInitOptions & Partial<OptionalInitOptions>
/** tag parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/#optional-attributes" for details. */
type TagOptions = StringValueObject
/** http-header field parameter configuration */
type HttpHeader = StringValueObject
/** extra parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/#optional-attributes" for details. */
type ExtraOptions = AnyValueObject
/** request parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/request/" for details. */
interface RequestOptions {
  headers?: HttpHeader
  method?: string
  url?: string
  query_string?: string
  data?: AnyValueObject
  cookies?: string
  env?: AnyValueObject
}
/** user parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/user/" for details. */
interface UserOptions {
  ip_address?: string
  id?: string | number
  username?: string
  email?: string
}
/** message parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/message/" for details. */
interface MessageOptions {
  message?: string
  params?: string[]
}
/** statcktrace frames parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/stacktrace/#frame-attributes" for details. */
interface StackTraceFrameItem {
  in_app?: boolean
  function: string
  filename: string
  lineno?: number
  colno?: number
  abs_path?: string
}
/** statcktrace parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/stacktrace/#attributes" for details. */
interface StackTraceOptions {
  frames: StackTraceFrameItem[]
}
/** exception values parameter configuration */
interface ExceptionItem {
  type: string
  value: string
  module?: string
  stacktrace?: StackTraceOptions
}
/** exception parameter configuration, see the document "https://develop.sentry.dev/sdk/event-payloads/exception/" for details. */
interface ExceptionOptions {
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
/** The configuration of Sentry log capture method */
interface SentryCaptureOptions extends Partial<OptionalInterfaceOptions & Pick<OptionalBaseOptions, 'level'>> {
  message?: string | MessageOptions
  type?: string
  event_id?: string
  exception?: ExceptionOptions
}
/** Sentry-related API interface response object */
interface SentryAPIResponse {
  id: string
}
/** Sentry SDK default return envelope */
interface SentrySDKResponse {
  /** Error code */
  code: number
  /** Communication data */
  data: SentryAPIResponse | null
  /** Tip message */
  message: string
}
/** The global scope object */
interface SentryScope {
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
interface ConfigureScopeCallback extends Function {
  (scope: SentryScope): void
}

declare module 'sentry-javascript' {
  export function init(options: SentryInitOptions): void
  export function configureScope(callback: ConfigureScopeCallback): void
  export function captureMessage(message: string, options?: LogLevel | SentryCaptureOptions): Promise<SentrySDKResponse>
  export function captureException(err: Error, options?: SentryCaptureOptions): Promise<SentrySDKResponse>
}

export { ExceptionOptions, ExtraOptions, RequestOptions, SentryCaptureOptions, SentryInitOptions, SentrySDKResponse, SentryScope, TagOptions, UserOptions };
