type LogKey = 'log' | 'debug' | 'info' | 'error' | 'warn'

const moduleName = 'sentry-js-sdk'
/**
 * @method 控制台输出信息
 */
export function outputMsg(msg: string, level: LogKey) {
  const key: LogKey = level || 'log'
  if (console.hasOwnProperty(key)) {
    console[key](`Module "${moduleName}" ${key} message => ${msg}`)
  } else {
    console.log(`Module "${moduleName}" debug message => ${msg}`)
  }
}
