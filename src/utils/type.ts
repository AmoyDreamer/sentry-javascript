/**
 * @method Determine if it is an object data
 */
export const isObject = (data: any) => {
  return typeof data === 'object' && data !== null && !Array.isArray(data)
}
