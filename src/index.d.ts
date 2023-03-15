import type {
  SentryInitOptions,
  SentryCaptureOptions,
  LogLevel,
  UserOptions,
  TagOptions,
  ExtraOptions,
  ExceptionOptions,
  RequestOptions,
  SentrySDKResponse,
  SentryScope,
  ConfigureScopeCallback
} from './types'

declare module 'sentry-js-sdk' {
  export function init(options: SentryInitOptions): void
  export function configureScope(callback: ConfigureScopeCallback): void
  export function captureMessage(message: string, options?: LogLevel | SentryCaptureOptions): Promise<SentrySDKResponse>
  export function captureException(err: Error, options?: SentryCaptureOptions): Promise<SentrySDKResponse>
}

export type {
  SentryInitOptions,
  SentryCaptureOptions,
  UserOptions,
  TagOptions,
  ExtraOptions,
  ExceptionOptions,
  RequestOptions,
  SentrySDKResponse,
  SentryScope
}
