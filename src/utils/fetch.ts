import type {
  RequestExternalOptions,
  CustomResponseError
} from '../types'
import {
  DISABLE_RETRY_HTTP_STATUS_LIST,
  MAX_RETRIES,
  RETRY_DELAY
} from '../constants'
/**
 * @method Support for retry fetch requests
 */
export async function fetchWithRetry(url: string, options = {}, externalOptions: RequestExternalOptions = {}) {
  let retryCount = 0
  const maxRetries = typeof externalOptions.maxRetries === 'number' ? externalOptions.maxRetries : MAX_RETRIES
  const retryDelay = typeof externalOptions.retryDelay === 'number' ? externalOptions.retryDelay : RETRY_DELAY
  /**
   * @method Fetch with state filtering, data parsing
   */
  const fetchPromise = async (): Promise<any> => {
    return fetch(url, options).then(response => {
      if (!response.ok) {
        const error = new Error(`Failed with status ${response.status}`) as CustomResponseError
        error.status = response.status
        throw error
      }
      return response.json()
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
          resolve(fetchPromise())
        }, retryDelay)
      })
      .then(retryResult => retryResult)
      .catch(() => retry())
    } else {
      throw new Error(`Max retries (${maxRetries}) exceeded for ${url}`)
    }
  }

  return fetchPromise().catch((err: CustomResponseError) => {
    if (err.status && DISABLE_RETRY_HTTP_STATUS_LIST.includes(err.status)) {
      throw err
    }
    return retry()
  })
}
