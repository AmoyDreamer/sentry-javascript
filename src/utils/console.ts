type LogKey = 'log' | 'debug' | 'info' | 'error'

export function outputMsg(msg: string, level: LogKey) {
  const key: LogKey = level || 'log';
  if (console.hasOwnProperty(key)) {
    console[key]('Module "sentry-js-sdk" ' + key + ' message => ' + msg);
  } else {
    console.log('Module "sentry-js-sdk" debug message => ' + msg);
  }
}
