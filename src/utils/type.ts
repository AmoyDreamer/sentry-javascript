/**
 * @method 获取数据类型
 */
const getDataType = (data: any): string => {
  return Object.prototype.toString.call(data).slice(8, -1)
}
/**
 * @method 是否是数组
 */
export const isArray = (data: any): boolean => {
  return typeof data === 'object' && getDataType(data) === 'Array'
}
/**
 * @method 是否是对象
 */
export const isObject = (data: any) => {
  // return typeof data === 'object' && data && !Array.isArray(data)
  return typeof data === 'object' && data !== null && !isArray(data)
}
