# sentry-javascript
A generic Javascript SDK based on [Self-Hosted Sentry](https://develop.sentry.dev/self-hosted/).

## Install

### Using unpkg CDN

#### Use the latest version file
```html
<script type="text/javascript" src="https://unpkg.com/sentry-javascript/index.js"></script>
```

#### Use the specified version file (recommended)
```html
<script type="text/javascript" src="https://unpkg.com/sentry-javascript@1.0.0/index.js"></script>
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

### Configuration Scope

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
| options | Sentry Initializes the configuration item object of the log service | object | ✅ | - |

##### **options** parameter configuration items

| parameter | description | type | required | default value |
|---|---|---|---|---|
| dsn | Sentry 日志服务的DSN，DSN 告诉 SDK 将事件发送到哪里（可通过配置后台获取）| string | 是 | - |
| enabled | 是否允许上报数据 | boolean | 否 | true |
| debug | 如果调试功能被启用，SDK 将尝试打印出有用的调试信息，如果在发送事件时出了问题。尽管开启调试模式不会引起任何安全问题，但通常不建议在生产环境中开启调试模式 | boolean | 否 | false |
| envelope | 是否使用 envelope 接口上报数据，具体可参考 [Envelopes](https://develop.sentry.dev/sdk/envelopes/) 和 [Store Endpoint](https://develop.sentry.dev/sdk/store/) | boolean | 否 | true |
| environment | 抛送日志数据的环境，一个版本可以与多个环境相关联，以便在用户界面上将它们分开（例如 staging vs prod 或者其它类似的比较）| string | 否 | production |
| release | 版本号，建议格式 **my-project-name@1.0.0** | string | 否 | - |

##### 返回值
无

### 捕获信息

#### Sentry.captureMessage(message, options)

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| message | 要抛送的信息 | string | 是 | - |
| options | 当传入的是一个字符串时，只能作为日志级别来使用，可使用的日志级别值有 fatal \| error \| warning \| info \| debug；当传入的是一个对象时，它作为一个可选参数配置项来使用，具体可见[配置项说明](#capture-方法的-options-参数配置项) | string/object | 否 | - |

#### 返回值
Promise\<SentrySDKResponse\>

### 捕获错误

#### Sentry.captureException(err, options)

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| err | 标准的错误实例，具体可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | object | 是 | - |
| options | 可选参数配置项，具体可见[配置项说明](#capture-方法的-options-参数配置项) | object | 否 | - |

#### 返回值
Promise\<SentrySDKResponse\>

### 配置 Scope

#### Sentry.configureScope(callback)

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| callback | 全局作用域回调函数 | funciton | 是 | - |

#### 返回值
无

#### 全局 Scope 对象说明

>提供了以下几种方法

##### 设置用户信息

**setUser(options)**

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| options | 设置用户信息，具体可参考[用户定义](https://develop.sentry.dev/sdk/event-payloads/user/) | object | 是 | - |

```js
Sentry.configureScope((scope) => {
  // 清空用户信息
  scope.setUser(null)
  // 设置用户信息
  scope.setUser({
    id: '666',
    email: 'john.doe@example.com'
  })
})
```

##### 设置标签

**setTag(key, value)**

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| key | 标签名 | string | 是 | - |
| value | 标签值 | string | 是 | - |

```js
Sentry.configureScope((scope) => {
  scope.setTag('my-tag', 'my value')
})
```
##### 移除标签

**removeTag(key)**

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| key | 标签名 | string | 是 | - |

```js
Sentry.configureScope((scope) => {
  scope.removeTag('my-tag')
})
```

##### 设置自定义扩展数据

**setExtra(key, value)**

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| key | 扩展数据名 | string | 是 | - |
| value | 扩展数据值 | any | 是 | - |

```js
Sentry.configureScope((scope) => {
  scope.setExtra('my-extra', {
    'key1': 'value1',
    'key2': 'value2'
  })
})
```
##### 移除自定义扩展数据

**removeExtra(key)**

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| key | 扩展数据名 | string | 是 | - |

```js
Sentry.configureScope((scope) => {
  scope.removeExtra('my-extra')
})
```

##### 设置日志级别

**setLevel(level)**

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| level | 日志级别，合法的值有 fatal \| error \| warning \| info \| debug | string | 是 | - |

```js
Sentry.configureScope((scope) => {
  scope.setLevel('debug')
  Sentry.captureMessage('Something went wrong')
})
```

##### 清空全局 Scope 配置

**clear()**

```js
Sentry.configureScope((scope) => {
  // 清空之前的scope配置
  scope.clear()
  // 设置新的标签信息
  scope.setTag('new-tag', 'new value')
})
```

### capture 方法的 options 参数配置项

此配置项说明仅针对 `Sentry.captureMessage` 和 `Sentry.captureException`

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|---|---|---|---|---|
| event_id | 事件ID，要求是一个合法的十六进制 uuid4 字符串值。长度正好为32个字符。不允许使用破折号。必须是小写的。 | string | 否 | - |
| message | 要抛送的信息，具体可参考[信息定义](https://develop.sentry.dev/sdk/event-payloads/message/)。如果该参数配置了一个合法的值，优先级将会高于 **Sentry.captureMessage** 方法的 `message` 参数 | string/object | 否 | - |
| level | 日志级别，可使用的日志级别值有 fatal \| error \| warning \| info \| debug | string | 否 | info
| type | 记录错误的事件模式，具体可参考[类型定义](https://develop.sentry.dev/sdk/event-payloads/types/)| string | 否 | event |
| exception | 指定程序中发生的异常或错误，具体可参考[异常定义](https://develop.sentry.dev/sdk/event-payloads/exception/) | object | 否 | - |
| request | 与事件相关的 HTTP 请求的信息，在客户端 SDK 中，这可以是传出请求，也可以是呈现当前网页的请求，具体可参考[请求定义](https://develop.sentry.dev/sdk/event-payloads/request/) | object | 否 | - |
| user | 当前的认证用户信息，具体可参考[用户定义](https://develop.sentry.dev/sdk/event-payloads/user/) | object | 否 | `{ip_address: '{{auto}}'}` |
| tags | 此事件标签列表，每个标签必须少于200个字符，具体可参考[事件负载配置](https://develop.sentry.dev/sdk/event-payloads/) | object | 否 | - |
| extra | 附加的扩展数据，以便与事件一起存储，具体可参考[事件负载配置](https://develop.sentry.dev/sdk/event-payloads/) | object | 否 | - |

### capture 方法的返回值说明

**在阅读该返回值说明之前需要先了解下预定义的 [SDK信封](#sdk-信封)**

此返回值说明仅针对使用 `Sentry.captureMessage` 和 `Sentry.captureException` 成功抛送后的结果。

| 字段 | 说明 | 类型 |
|---|---|---|
| id | 事件id | string |


## SDK 信封

预定义的SDK信封本质是一个object类型的数据，以下是它的一个结构说明

| 字段 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| code | 错误码 | number | - |
| data | 通信数据，任何有意义数据都会在此字段给出 | object | null |
| message | 提示信息 | string | - |

### 错误码说明

| 错误码 | 说明 |
|---|---|
| 0 | 成功 |
| 400 | 请求失败，通常是一些调用和传递的参数错误导致 |
| 413 | 请求体内容过大，例如抛送的数据太大，当前 SDK 限制了最大只能传 **20MB** 的数据 |
| 429 | 请求太多，通常是服务本身因为并发负载太高而响应 |
| 500 | 网络错误，通常是一些网络连接问题，例如请求超时 |
| 10001 | 当前设置了禁止抛送数据 |

### 如何正确的开信封获取数据

这是一个获取事件 id 的 demo
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

## TypeScript 支持

该模块天然支持 TypeScript，下面是一个 demo

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
