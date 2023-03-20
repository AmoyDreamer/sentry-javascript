# sentry-javascript
A generic Javascript SDK based on [Self-Hosted Sentry](https://develop.sentry.dev/self-hosted/).

## Install

### Using unpkg CDN

#### Use the latest version file
```html
<script type="text/javascript" src="https://unpkg.com/sentry-javascript/dist/index.js"></script>
```

#### Use the specified version file (recommended)
```html
<script type="text/javascript" src="https://unpkg.com/sentry-javascript@1.0.1/dist/index.js"></script>
```

### Using npm
```bash
npm install sentry-javascript --save
```

### Using yarn
```bash
yarn add sentry-javascript
```

## Usage

### Initialization

#### ESM
```js
import * as Sentry from 'sentry-javascript'

Sentry.init({
  dsn: '_your_sentry_dsn'
})
```

#### CommonJS
```js
const Sentry = require('sentry-javascript')
// const Sentry = require('sentry-javascript/cjs')

Sentry.init({
  dsn: '_your_sentry_dsn'
})
```

#### Usage of CDN resource
```js
window.Sentry.init({
  dsn: '_your_sentry_dsn'
})
```

### Capture message

The current operation must be performed after initialization.

```js
Sentry.captureMessage('Something went wrong')
```

### Capture exception

The current operation must be performed after initialization.

```js
try {
  /* something to do */
  aFunctionThatMightFail()
} catch(e) {
  Sentry.captureException(e)
}
```

### Configure scope

The current operation must be performed after initialization.

```js
Sentry.configureScope((scope) => {
  // for instance, add custom tags or inform Sentry about the currently authenticated user
  scope.setTag('my-tag', 'my value')
  scope.setUser({
    id: '666',
    email: 'john.doe@example.com'
  })
})
```

## Method

### Initialization
#### Sentry.init(options)

| parameter | description | type | required | default value |
|---|---|---|---|---|
| options | Sentry Initializes the configuration item object of the log. service | object | ✅ | - |

##### **options** parameter configuration items

| parameter | description | type | required | default value |
|---|---|---|---|---|
| dsn | DSN for the Sentry logging service, the DSN tells the SDK where to send the events (available through the configuration backend).| string | ✅ | - |
| enabled | Whether to allow data to be reported. | boolean | ❌ | true |
| debug | If debugging is enabled, the SDK will attempt to print out useful debugging information if something goes wrong while sending an event. Although enabling debug mode does not cause any security issues, it is usually not recommended to enable debug mode in production environments. | boolean | ❌ | false |
| envelope | Whether to use the envelope interface to report data, see [Envelopes](https://develop.sentry.dev/sdk/envelopes/) and [Store Endpoint](https://develop.sentry.dev/sdk/store/) for details. | boolean | ❌ | true |
| environment | Environments that send log data, a version can be associated with multiple environments to separate them in the user interface (e.g. staging vs prod or other similar comparisons). | string | ❌ | production |
| release | Version number, suggested format **my-project-name@1.0.0**. | string | ❌ | - |

##### Return value
None

### Capture message

#### Sentry.captureMessage(message, options)

| parameter | description | type | required | default value |
|---|---|---|---|---|
| message | Message to be sent. | string | ✅ | - |
| options | When passed in as a string, it can only be used as a log level, the available values are fatal \| error \| warning \| info \| debug; when passed in as an object, it is used as an optional parameter configuration item, see [configuration item description](#the-options-of-capture-methods) for details. | string/object | ❌ | - |

#### Return value
Promise\<SentrySDKResponse\>

### Capture exception

#### Sentry.captureException(err, options)

| parameter | description | type | required | default value |
|---|---|---|---|---|
| err | Instance of a standard Error, see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) for details. | object | ✅ | - |
| options | An optional parameter configuration item, see [configuration item description](#the-options-of-capture-methods) for details. | object | ❌ | - |

#### Return value
Promise\<SentrySDKResponse\>

### Configure scope

#### Sentry.configureScope(callback)

| parameter | description | type | required | default value |
|---|---|---|---|---|
| callback | Global scope callback function. | funciton | ✅ | - |

#### Return value
None

#### Description of the global Scope object

>The following methods are provided.

##### Set user information

**`setUser(options)`**

| parameter | description | type | required | default value |
|---|---|---|---|---|
| options | User information object, see [User Definition](https://develop.sentry.dev/sdk/event-payloads/user/) for details. | object | ✅ | - |

```js
Sentry.configureScope((scope) => {
  // clear user information
  scope.setUser(null)
  // set user information
  scope.setUser({
    id: '666',
    email: 'john.doe@example.com'
  })
})
```

##### Set tags

**setTag(key, value)**

| parameter | description | type | required | default value |
|---|---|---|---|---|
| key | Tag name. | string | ✅ | - |
| value | Tag value. | string | ✅ | - |

```js
Sentry.configureScope((scope) => {
  scope.setTag('my-tag', 'my value')
})
```
##### Remove tag

**removeTag(key)**

| parameter | description | type | required | default value |
|---|---|---|---|---|
| key | Tag name. | string | ✅ | - |

```js
Sentry.configureScope((scope) => {
  scope.removeTag('my-tag')
})
```

##### Set extra data

**setExtra(key, value)**

| parameter | description | type | required | default value |
|---|---|---|---|---|
| key | Extra data name. | string | ✅ | - |
| value | Extra data value. | any | ✅ | - |

```js
Sentry.configureScope((scope) => {
  scope.setExtra('my-extra', {
    'key1': 'value1',
    'key2': 'value2'
  })
})
```
##### Remove extra data

**removeExtra(key)**

| parameter | description | type | required | default value |
|---|---|---|---|---|
| key | Extra data name. | string | ✅ | - |

```js
Sentry.configureScope((scope) => {
  scope.removeExtra('my-extra')
})
```

##### Set log level

**setLevel(level)**

| parameter | description | type | required | default value |
|---|---|---|---|---|
| level | Log level, the available values are fatal \| error \| warning \| info \| debug | string | ✅ | - |

```js
Sentry.configureScope((scope) => {
  scope.setLevel('debug')
  Sentry.captureMessage('Something went wrong')
})
```

##### Clear the global scope configuration

**clear()**

```js
Sentry.configureScope((scope) => {
  // clear the previous scope configuration
  scope.clear()
  // set new tag
  scope.setTag('new-tag', 'new value')
})
```

### The options of capture methods

This configuration note is only for `Sentry.captureMessage` and `Sentry.captureException`.

| parameter | description | type | required | default value |
|---|---|---|---|---|
| event_id | Hexadecimal string representing a uuid4 value. The length is exactly 32 characters. Dashes are not allowed. Has to be lowercase. | string | ❌ | - |
| message | Message to be sent，see [Message Definition](https://develop.sentry.dev/sdk/event-payloads/message/) for details. If this parameter is configured with a legal value, it will take precedence over the `message` parameter of the **Sentry.captureMessage** method. | string/object | ❌ | - |
| level | Log level, the available values are fatal \| error \| warning \| info \| debug. The default value of the `Sentry.captureMessage` method is **info**, and the default value of the `Sentry.captureException` method is **error**. | string | ❌ | - |
| type | Event type for recording errors, see [Type Definition](https://develop.sentry.dev/sdk/event-payloads/types/) for details. | string | ❌ | event |
| exception | Specify the exception or error that occurred in the program, see [Exception Definition](https://develop.sentry.dev/sdk/event-payloads/exception/) for details. | object | ❌ | - |
| request | The Request interface contains information on a HTTP request related to the event. In client SDKs, this can be an outgoing request, or the request that rendered the current web page, see [Request Definition](https://develop.sentry.dev/sdk/event-payloads/request/) for details. | object | ❌ | - |
| user | Current authenticated user information, see [User Definition](https://develop.sentry.dev/sdk/event-payloads/user/) for details. | object | ❌ | `{ip_address: '{{auto}}'}` |
| tags | A map or list of tags for this event. Each tag must be less than 200 characters, see [Event Payloads](https://develop.sentry.dev/sdk/event-payloads/) for details. | object | ❌ | - |
| extra | An arbitrary mapping of additional metadata to store with the event, see [Event Payloads](https://develop.sentry.dev/sdk/event-payloads/) for details. | object | ❌ | - |

### Return value description of capture method

**Before reading this return value description, you need to understand the predefined [SDK envelope](#sdk-envelope).**

This return value description is only for results sent successfully using `Sentry.captureMessage` and `Sentry.captureException`.

| key | description | type |
|---|---|---|
| id | Event identifier. | string |


## SDK envelope

The predefined SDK envelope is essentially a data of type object, and the following is a description of its structure.

| key | description | type | default value |
|---|---|---|---|
| code | Error code. | number | - |
| data | Communication data, any meaningful data will be given in this field. | object | null |
| message | Tip message | string | - |

### Error Code Description

| error code | description |
|---|---|
| 0 | Success |
| 400 | Bad request. Usually it is some call and passed parameter error that causes. |
| 413 | Request content too large. For example, if the data sent is too large, the current SDK limits it to a maximum of **20MB**. |
| 429 | Too many requests. It is usually the service itself that responds because the concurrent load is too high. |
| 500 | Network errors. Usually some network connection problems, such as request timeouts. |
| 10001 | The current SDK is set to disable sending data. |

### How to open the envelope properly to get the data

This is a demo to get the event id.
```js
import * as Sentry from 'sentry-javascript'

const getEventId = async () => {
  const res = await Sentry.captureMessage('Something went wrong')
  let eventId = ''
  if (res.code === 0 && res.data && res.data.id) {
    eventId = res.data.id
  }
  return eventId
}
const eventId = await getEventId()
console.log('current event id is: ' + eventId)
// output `current event id is: xxxxxxxx`
```

## TypeScript Support

The module naturally supports TypeScript, and here is a demo.

```ts
import * as Sentry from 'sentry-javascript'
import type { SentrySDKResponse } from 'sentry-javascript'

const getCaptureStatus = async (): Promise<string> => {
  const res: SentrySDKResponse = await Sentry.captureMessage('Something went wrong')
  let status = 'fail'
  if (res.code === 0 && res.data && res.data.id) {
    status = 'success'
  }
  return status
}
const status = await getCaptureStatus()
console.log('current data capture is ' + status)
// output `current data capture is success`
```

## License
sentry-javascript is [MIT licensed](https://github.com/AmoyDreamer/sentry-javascript/blob/master/LICENSE).
