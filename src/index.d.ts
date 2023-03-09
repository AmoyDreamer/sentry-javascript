import type {
  InitOptions,
  SentryCaptureOptions,
  UserOptions,
  TagOptions,
  ExtraOptions,
  ExceptionOptions,
  RequestOptions,
  SentrySDKResponse
} from './types'

declare module 'sentry-js-sdk' {
  export function init(options: InitOptions): void
  export function configureScope(callback: Function): void
  export function captureMessage(message: string, options?: SentryCaptureOptions): Promise<any> | void
  export function captureException(err: Error, options?: SentryCaptureOptions): Promise<any> | void
}

export type {
  InitOptions,
  SentryCaptureOptions,
  UserOptions,
  TagOptions,
  ExtraOptions,
  ExceptionOptions,
  RequestOptions,
  SentrySDKResponse
}
