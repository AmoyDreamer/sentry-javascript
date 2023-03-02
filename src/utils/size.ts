// 1KB大小
const SIZE_KB = 1024
// 1MB大小
const SIZE_MB = SIZE_KB ** 2
// 1GB大小
const SIZE_GB = SIZE_KB ** 3
// 获取字符串数据的字节数
const byteSize = (str: string) => new Blob([str]).size

// 日志抛送数据大小限制 - 20MB
export const limitSize = 20 * SIZE_MB

// 是否超过数据大小上限
export const isOversized = (str: string, size: number = limitSize) => byteSize(str) > size

// 获取数据大小（带单位）
export const getDataSizeString = (val: number, digits: number = 0) => {
  if (typeof val !== 'number' || val <= 0) return ''
  if (val > SIZE_GB) {
    return `${(val / SIZE_GB).toFixed(digits)}G`
  } else if (val > SIZE_MB) {
    return `${(val / SIZE_MB).toFixed(digits)}M`
  } else if (val > SIZE_KB) {
    return `${(val / SIZE_KB).toFixed(digits)}K`
  } else {
    return `${val}B`
  }
}
