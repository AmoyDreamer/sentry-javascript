import type {
  SentryInitOptions,
  SentryCaptureOptions,
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
  export function captureMessage(message: string, options?: SentryCaptureOptions): Promise<any> | void
  export function captureException(err: Error, options?: SentryCaptureOptions): Promise<any> | void
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
