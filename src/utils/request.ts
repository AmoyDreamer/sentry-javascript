import { isSupportedFetch } from './env'
import { fetchWithRetry } from './fetch'
import { xhrWithRetry } from './xhr'
import type { RequestExternalOptions } from '../types'

/**
 * @method Http request
 */
export async function request(url: string, options = {}, externalOptions: RequestExternalOptions = {}): Promise<any> {
  return isSupportedFetch() ? fetchWithRetry(url, options, externalOptions) : xhrWithRetry(url, options, externalOptions)
}
