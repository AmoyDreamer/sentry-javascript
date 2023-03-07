import type {
  CustomResponseError,
  StringValueObject,
  SentrySDKResponse
} from '../types'
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_TOO_MANY_REQUESTS,
  HTTP_STATUS_INTERNAL_SERVER_ERROR
} from '../constants'
/** 状态码提示信息对象 */
const errorMessages: Readonly<StringValueObject> = {
  [HTTP_STATUS_BAD_REQUEST]: 'Bad Request',
  [HTTP_STATUS_TOO_MANY_REQUESTS]: 'Too Many Requests',
  [HTTP_STATUS_INTERNAL_SERVER_ERROR]: 'Internal Server Error'
}
/**
 * @method 解析response
 */
export function parseResponse(res: any): SentrySDKResponse {
  return {
    code: 0,
    data: res,
    message: ''
  }
}
/**
 * @method 解析error
 */
export function parseError(err: CustomResponseError): SentrySDKResponse {
  let code = HTTP_STATUS_INTERNAL_SERVER_ERROR
  if (err.status && typeof err.status === 'number' && err.status < 1000 && errorMessages[err.status]) {
    code = err.status
  }
  return {
    code: code,
    data: null,
    message: errorMessages[code]
  }
}
