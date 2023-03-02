type LogKey = 'log' | 'debug' | 'info' | 'error'

const moduleName = 'sentry-js-sdk'

export function outputMsg(msg: string, level: LogKey) {
  const key: LogKey = level || 'log'
  if (console.hasOwnProperty(key)) {
    console[key](`Module "${moduleName}" ${key} message => ${msg}`)
  } else {
    console.log(`Module "${moduleName}" debug message => ${msg}`)
  }
}
