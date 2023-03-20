/** 1KB size */
const SIZE_KB = 1024
/** 1MB size */
const SIZE_MB = SIZE_KB ** 2
/** 1GB size */
const SIZE_GB = SIZE_KB ** 3
/** Log sending data size limit - 20MB */
export const limitSize = 20 * SIZE_MB
/**
 * @method Get the number of bytes of string data
 */
const byteSize = (str: string) => new Blob([str]).size
/**
 * @method Whether the data size limit is exceeded
 */
export const isOversized = (str: string, size: number = limitSize) => byteSize(str) > size
/**
 * @method Get data size (with units)
 */
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
