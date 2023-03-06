/**
 * @method 是否是对象
 */
export const isObject = (data: any) => {
  return (typeof data === 'object' && data !== null)
}
