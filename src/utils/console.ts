/** A collection of allowed log types */
const allowLogTypes = ['log', 'debug', 'info', 'error', 'warn'] as const
/** Current module name */
const moduleName = 'sentry-javascript'
/**
 * @method Console output information
 */
export function outputMsg(msg: string, level: typeof allowLogTypes[number]) {
  const key = level && allowLogTypes.includes(level) ? level : 'log'
  if (console.hasOwnProperty(key)) {
    console[key](`Module "${moduleName}" ${key} message => ${msg}`)
  } else {
    console.log(`Module "${moduleName}" debug message => ${msg}`)
  }
}
