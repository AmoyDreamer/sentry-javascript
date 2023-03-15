/** http状态码 - Ok */
export const HTTP_STATUS_SUCCESS = 200
/** http状态码 - Bad Request */
export const HTTP_STATUS_BAD_REQUEST = 400
/** http状态码 - Too Many Requests */
export const HTTP_STATUS_TOO_MANY_REQUESTS = 429
/** http状态码 - Internal Server Error */
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
/** http状态码 - Payload Too Large */
export const HTTP_STATUS_PAYLOAY_TOO_LARGE = 413
/** 禁止重新请求的http状态码集合 */
export const DISABLE_RETRY_HTTP_STATUS_LIST = [HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_TOO_MANY_REQUESTS]
/** 自定义状态码 - 禁止上传日志 */
export const CUSTOM_STATUS_DISABLE_UPLOAD_LOG = 10001
/** http请求 - 最大重试次数 */
export const MAX_RETRIES = 1
/** http请求 - 延迟重试请求时间（单位：毫秒） */
export const RETRY_DELAY = 1000
