// 获取数据类型
export const getDataType = (data: any): string => {
  return Object.prototype.toString.call(data).slice(8, -1)
}
