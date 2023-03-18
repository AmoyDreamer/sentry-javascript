/** 允许使用的日志类型集合 */
const allowLogTypes = ['log', 'debug', 'info', 'error', 'warn'] as const
/** 当前模块名称 */
const moduleName = 'sentry-javascript'
/**
 * @method 控制台输出信息
 */
export function outputMsg(msg: string, level: typeof allowLogTypes[number]) {
  const key = level && allowLogTypes.includes(level) ? level : 'log'
  if (console.hasOwnProperty(key)) {
    console[key](`Module "${moduleName}" ${key} message => ${msg}`)
  } else {
    console.log(`Module "${moduleName}" debug message => ${msg}`)
  }
}
