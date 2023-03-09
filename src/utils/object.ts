/**
 * @method 对象深合并
 */
export function deepMerge<T extends object>(
  target: T,
  ...sources: object[]
): T {
  // 用于跟踪对象的引用
  const seen: WeakSet<object> = new WeakSet()

  const merge = (target: any, source: any): any => {
    if (typeof target !== 'object' || typeof source !== 'object') {
      return source
    }

    if (seen.has(source)) {
      return source
    }

    seen.add(source)

    const result = Array.isArray(target) ? [...target] : { ...target }

    if (Array.isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        result[i] = i in target
          ? merge(target[i], source[i])
          : source[i]
      }
    } else {
      for (const key in source) {
        const sourceValue = source[key]
        const targetValue = result[key]
        result[key] = (typeof sourceValue === 'object' && sourceValue !== null)
          ? (typeof targetValue === 'object' && targetValue !== null)
            ? merge(targetValue, sourceValue)
            : sourceValue
          : sourceValue
      }
    }

    seen.delete(source)

    return result as T
  }

  sources.forEach((source) => {
    target = merge(target, source)
  })

  return target
}
