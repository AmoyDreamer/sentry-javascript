import { isObject } from './type'
import {
  HTTP_STATUS_SUCCESS,
  DISABLE_RETRY_HTTP_STATUS_LIST,
  MAX_RETRIES,
  RETRY_DELAY
} from '../constants'
import type {
  RequestExternalOptions,
  HttpHeader,
  CustomResponseError
} from '../types'
/** A collection of allowed request methods */
const allowMethods = ['GET', 'POST', 'HEAD', 'PUT', 'OPTIONS', 'DELETE', 'CONNECT'] as const
/** xhrWithRetry request configuration */
interface Options {
  /** http request headers */
  headers?: HttpHeader
  /** http request body content */
  body?: XMLHttpRequestBodyInit
  /** http request method */
  method?: typeof allowMethods[number]
}
/**
 * @method XMLHttpRequest with support for retry
 */
export async function xhrWithRetry(url: string, options: Options = {}, externalOptions: RequestExternalOptions = {}) {
  let retryCount = 0
  const maxRetries = typeof externalOptions.maxRetries === 'number' ? externalOptions.maxRetries : MAX_RETRIES
  const retryDelay = typeof externalOptions.retryDelay === 'number' ? externalOptions.retryDelay : RETRY_DELAY
  const headers = isObject(options.headers) ? options.headers : {}
  const body = options.body
  const method = typeof options.method === 'string' && allowMethods.includes(options.method) ? options.method : 'GET'
  /**
   * @method XMLHttpRequest with state filtering, data parsing, and Promise support
   */
  const xhrPromise = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onerror = (err) => reject(err)
      xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === HTTP_STATUS_SUCCESS && xhr.response) {
          const res = JSON.parse(xhr.response)
          resolve(res)
        } else {
          const error = new Error(`Failed with status ${xhr.status}`) as CustomResponseError
          error.status = xhr.status
          reject(error)
        }
      }
      xhr.open(method, url)
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          xhr.setRequestHeader(key, headers[key])
        }
      }
      xhr.send(body)
    })
  }
  /**
   * @method Retry request
   */
  const retry = async (): Promise<any> => {
    retryCount++
    if (retryCount <= maxRetries) {
      return new Promise(resolve => {
        setTimeout(() => {
          // console.log(`Retrying ${url}... (attempt ${retryCount} of ${maxRetries})`)
          resolve(xhrPromise())
        }, retryDelay)
      })
      .then(retryResult => retryResult)
      .catch(() => retry())
    } else {
      throw new Error(`Max retries (${maxRetries}) exceeded for ${url}`)
    }
  }

  return xhrPromise().catch((err: CustomResponseError) => {
    if (err.status && DISABLE_RETRY_HTTP_STATUS_LIST.includes(err.status)) {
      throw err
    }
    return retry()
  })
}
