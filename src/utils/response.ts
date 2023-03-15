import type {
  CustomResponseError,
  StringValueObject,
  SentrySDKResponse
} from '../types'
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_TOO_MANY_REQUESTS,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_PAYLOAY_TOO_LARGE,
  CUSTOM_STATUS_DISABLE_UPLOAD_LOG
} from '../constants'
import { limitSize, getDataSizeString } from './size'
/** 状态码提示信息对象 */
const errorMessages: Readonly<StringValueObject> = {
  [HTTP_STATUS_BAD_REQUEST]: 'Bad Request',
  [HTTP_STATUS_TOO_MANY_REQUESTS]: 'Too Many Requests',
  [HTTP_STATUS_INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HTTP_STATUS_PAYLOAY_TOO_LARGE]: `The current size of the log to be uploaded has exceeded the ${getDataSizeString(limitSize)} limit`,
  [CUSTOM_STATUS_DISABLE_UPLOAD_LOG]: 'Log uploading is disabled'
}
/**
 * @method 获取服务错误返回值
 */
function getInternalServerErrorResponse(): SentrySDKResponse {
  const code = HTTP_STATUS_INTERNAL_SERVER_ERROR
  return {
    code: code,
    data: null,
    message: errorMessages[code]
  }
}
/**
 * @method 获取请求错误返回值
 */
export function getBadRequestResponse(msg?: string): SentrySDKResponse {
  const code = HTTP_STATUS_BAD_REQUEST
  return {
    code: code,
    data: null,
    message: msg || errorMessages[code]
  }
}
/**
 * @method 获取对应的错误码返回值
 */
export function getResponseByCode(code: number): SentrySDKResponse {
  const msg = errorMessages[code]
  if (msg) {
    return {
      code: code,
      data: null,
      message: msg
    }
  }
  return getBadRequestResponse()
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
  const res = getInternalServerErrorResponse()
  if (err.status && typeof err.status === 'number' && err.status < 1000) {
    const msg: string = errorMessages[err.status]
    // 匹配到预定义的状态码，则展示对应信息
    if (msg) {
      res.code = err.status
      res.message = msg
    }
  }
  return res
}
