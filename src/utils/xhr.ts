import { isObject } from './type'
import {
  HTTP_STATUS_SUCCESS,
  HTTP_STATUS_TOO_MANY_REQUESTS,
  MAX_RETRIES,
  RETRY_DELAY
} from '../constants'
import type { RequestExternalOptions, HttpHeader } from '../types'
/** 允许的请求方式集合 */
const enableMethods = ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'] as const
/** xhrWithRetry 请求配置项对象 */
interface Options {
  /** http请求头对象 */
  headers?: HttpHeader
  /** http请求体内容 */
  body?: XMLHttpRequestBodyInit
  /** http请求方法 */
  method?: typeof enableMethods[number]
}
/**
 * @method 支持retry的XMLHttpRequest
 */
export async function xhrWithRetry(url: string, options: Options = {}, externalOptions: RequestExternalOptions = {}) {
  let retryCount = 0
  const maxRetries = typeof externalOptions.maxRetries === 'number' ? externalOptions.maxRetries : MAX_RETRIES
  const retryDelay = typeof externalOptions.retryDelay === 'number' ? externalOptions.retryDelay : RETRY_DELAY
  const headers = isObject(options.headers) ? options.headers : {}
  const body = options.body
  const method = typeof options.method === 'string' && enableMethods.includes(options.method) ? options.method : 'GET'

  const xhrPromise = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onerror = (err) => reject(err)
      xhr.onload = function () {
        // 并发请求太多，禁止重试
        if (xhr.status === HTTP_STATUS_TOO_MANY_REQUESTS) {
          retryCount = maxRetries
        }
        if (xhr.readyState === 4 && xhr.status === HTTP_STATUS_SUCCESS && xhr.response) {
          const res = JSON.parse(xhr.response)
          resolve(res)
        } else {
          reject(`Failed with status ${xhr.status}`)
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

  const retry = async (): Promise<any> => {
    retryCount++
    if (retryCount <= maxRetries) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`Retrying ${url}... (attempt ${retryCount} of ${maxRetries})`)
          resolve(xhrPromise())
        }, retryDelay)
      })
      .then(retryResult => retryResult)
      .catch(() => retry())
    } else {
      throw new Error(`Max retries (${maxRetries}) exceeded for ${url}`)
    }
  }

  return xhrPromise().catch(() => retry())
}
