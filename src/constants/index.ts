/** http status - Ok */
export const HTTP_STATUS_SUCCESS = 200
/** http status - Bad Request */
export const HTTP_STATUS_BAD_REQUEST = 400
/** http status - Too Many Requests */
export const HTTP_STATUS_TOO_MANY_REQUESTS = 429
/** http status - Internal Server Error */
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
/** http status - Payload Too Large */
export const HTTP_STATUS_PAYLOAY_TOO_LARGE = 413
/** the collection of http status codes that disabled retry request */
export const DISABLE_RETRY_HTTP_STATUS_LIST = [HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_TOO_MANY_REQUESTS]
/** custom status code - Disable Log Upload */
export const CUSTOM_STATUS_DISABLE_UPLOAD_LOG = 10001
/** http request - Maximum number of retries */
export const MAX_RETRIES = 1
/** http request - Delayed retry request time (in ms) */
export const RETRY_DELAY = 1000
