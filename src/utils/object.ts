import { isObject } from './type'
/**
 * @method 对象深合并
 */
export function deepMerge<T>(...sources: any[]): T {
  const seen = new WeakMap()
  const output: any = {}

  for (const source of sources) {
    if (isObject(source)) {
      for (const key in source) {
        const sourceValue = source[key]

        if (isObject(sourceValue)) {
          if (!(key in output)) Object.assign(output, { [key]: {} })
          output[key] = deepMerge(output[key], sourceValue, seen)
        } else {
          Object.assign(output, { [key]: sourceValue })
        }
      }
    }
  }

  return output
}
