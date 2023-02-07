/**
 * @method 是否支持原生的fetch方法
 */
function isNativeFetch(func: Function): boolean {
  return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
/**
 * @method 判断是否支持fetch
 */
export function isSupportedFetch(): boolean {
  if (!window.fetch) return false;
  try {
    new Headers();
    new Request('');
    new Response();
    return isNativeFetch(window.fetch);
  } catch(e) {
    return false;
  }
}
