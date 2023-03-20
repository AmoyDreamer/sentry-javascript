/**
 * @method Whether or not the native fetch method is supported
 */
function isNativeFetch(func: Function): boolean {
  return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString())
}
/**
 * @method Determine if fetch is supported
 */
export function isSupportedFetch(): boolean {
  if (!window.fetch) return false
  try {
    new Headers()
    new Request('')
    new Response()
    return isNativeFetch(window.fetch)
  } catch(e) {
    return false
  }
}
