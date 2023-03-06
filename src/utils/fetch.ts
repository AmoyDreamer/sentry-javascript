import type { RequestExternalOptions } from '../types'
import {
  HTTP_STATUS_TOO_MANY_REQUESTS,
  MAX_RETRIES,
  RETRY_DELAY
} from '../constants'
/**
 * @method 支持retry的fetch请求
 */
export async function fetchWithRetry(url: string, options = {}, externalOptions: RequestExternalOptions = {}) {
  let retryCount = 0
  const maxRetries = typeof externalOptions.maxRetries === 'number' ? externalOptions.maxRetries : MAX_RETRIES
  const retryDelay = typeof externalOptions.retryDelay === 'number' ? externalOptions.retryDelay : RETRY_DELAY

  const fetchPromise = async (): Promise<any> => {
    return fetch(url, options).then(response => {
      // 并发请求太多，禁止重试
      if (response.status === HTTP_STATUS_TOO_MANY_REQUESTS) {
        retryCount = maxRetries
        // 理想状态下，此处还得根据 Retry-After 字段信息设置下一次允许retry的时间，在这之前不应该发起任何的无效请求
      }
      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`)
      }
      return response.json()
    })
  }

  const retry = async (): Promise<any> => {
    retryCount++
    if (retryCount <= maxRetries) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`Retrying ${url}... (attempt ${retryCount} of ${maxRetries})`)
          resolve(fetchPromise())
        }, retryDelay)
      })
      .then(retryResult => retryResult)
      .catch(() => retry())
    } else {
      throw new Error(`Max retries (${maxRetries}) exceeded for ${url}`)
    }
  }

  return fetchPromise().catch(() => retry())
}
