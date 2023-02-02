/**
 * @author Allen Liu
 * @document https://develop.sentry.dev/sdk/
 */
(function() {
  var Sentry = function(obj) {
    if (obj instanceof Sentry) return obj;
    if (!(this instanceof Sentry)) return new Sentry(obj);
    this.SentryWrapped = obj;
  }
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Sentry;
    }
    exports.Sentry = Sentry;
  } else {
    this.Sentry = Sentry;
  }
  /**
   * @method 控制台输出信息
   * @param {String} msg => 要输出到控制台的具体信息.(必填)
   * @param {String} level => 输出的信息等级，对应原生console对象的方法，默认值为"log".(可选)
   */
  function outputMsg(msg, level) {
    var level = level || 'log';
    if (console.hasOwnProperty(level)) {
      console[level]('Module "sentry-js-sdk" ' + level + ' message => ' + msg);
    } else {
      console.log('Module "sentry-js-sdk" debug message => ' + msg);
    }
  }
  /**
   * @method 获取数据类型
   * @param {Any} data
   */
  function getDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1);
  }
  /**
   * @method 是否支持原生的fetch方法
   * @param {Function} func
   */
  function isNativeFetch(func) {
    return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
  }
  /**
   * @method 判断是否支持fetch
   */
  function isSupportedFetch() {
    if (!'fetch' in window) return false;
    try {
      new Headers();
      new Request('');
      new Response();
      return isNativeFetch(window.fetch);
    } catch(e) {
      return false;
    }
  }
  /**
   * @method 对象合并
   * @param {Object} obj1 将被合并的对象
   * @param {Object} obj2 将要合并的对象
   * @return {Object} obj3 合并完成后的对象
   */
  function mergeObject(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }
  // Sentry DSN 正则
  var dsnReg = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
  // 是否允许上报日志，默认为允许上报
  Sentry.enabled = true;
  // 上报的SDK平台
  Sentry.platform = 'javascript';
  // 日志级别
  Sentry.level = 'error';// 支持的值有fatal、error、warning、info、debug
  // 记录事件来源的主机名
  Sentry.serverName = window.location.hostname;
  // 环境，默认为生产环境
  Sentry.environment = 'production';
  // 用户配置
  // Sentry.user = {
  //   ip_address: '{{auto}}'// 用户ip地址，此处默认为服务器自动获取
  // };
  /**
   * @method 初始化SDK
   * @param {Object} options SDK配置项对象。(必填)
   */
  Sentry.init = function(options) {
    // 非法地配置项对象参数
    if (typeof options !== 'object' || options === null) {
      outputMsg('method "init" must pass a object variable, please check again!', 'error');
      return;
    }
    // 非法的dsn参数
    if (typeof options.dsn !== 'string') {
      outputMsg('method "init" must pass the value of "dsn" on options params, please check again!', 'error');
      return;
    }
    // 非法的dsn格式
    if (!dsnReg.test(options.dsn)) {
      outputMsg('"dsn" must be a valid value, please check again!', 'error');
      return;
    }
    Sentry.dsn = options.dsn;
    // 合法的enabled参数值
    if (typeof options.enabled === 'boolean') {
      Sentry.enabled = options.enabled;
    }
  }
  /**
   * @method 解析DSN地址
   */
  Sentry.parseDSN = function() {
    // 非法的dns
    if (!Sentry.dsn) {
      outputMsg('please check if the "init" method was called!', 'error');
      return;
    }
    var matches = Sentry.dsn.exec(dsnReg);
    var nodes = matches.slice(1);
    var protocol = nodes[0];
    var publicKey = nodes[1];
    var host = nodes[3];
    var port = nodes[4];
    var projectId = nodes[5];
    return {
      uri: protocol + '://' + host + (port ? ':' + port : ''),
      publicKey: nodes[1],
      projectId: nodes[5]
    }
  }
  /**
   * @method 上传日志到日志服务器
   * @param {Object} options Sentry SDK 配置项对象
   */
  Sentry.uploadLog = function(options) {
    // 禁止上传日志
    if (!Sentry.enabled) return;
    // 非法的日志信息
    if (typeof options !== 'object' || options === null) {
      outputMsg('method "uploadLog" must pass a object variable, please check again!', 'error');
      return;
    }
    var basicRequestOptions = parseDSN();
    // 构造请求头
    var headers = {
      'Content-Type': 'application/json',
      'X-Sentry-Auth': 'Sentry sentry_version=7,sentry_client=sentry-' + Sentry.platform + '/7.0,sentry_key=' + basicRequestOptions.publicKey
    };
    // 日志上传接口地址
    var url = basicRequestOptions.uri + '/api/' + basicRequestOptions.projectId + '/store';
    // 构造基础的请求数据
    var basicPayload = {
      platform: Sentry.platform,
      level: Sentry.level,
      server_name: Sentry.serverName,
      environment: Sentry.environment,
      timestamp: new Date().toISOString(),
    };
    // 构造目标请求数据
    var targetPayload = mergeObject(basicPayload, options);
    // 不存在user配置项，则设置一个默认配置
    if (!targetPayload.user) {
      targetPayload.user = {
        ip_address: '{{auto}}'// 用户ip地址，此处默认为服务器自动获取
      }
    } else {
      // 存在user配置项但是不存在user.ip_address配置子项
      if (!targetPayload.user.ip_address) {
        targetPayload.user.ip_address = '{{auto}}'// 用户ip地址，此处默认为服务器自动获取
      }
    }
    // 支持fecth请求
    if (isSupportedFetch()) {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(targetPayload)
      })
      .then(function(res) {
        return res.json()
      })
      .then(function(res) {
        console.log('fetch result => ', res)
      })
      .catch(function(err) {
        console.log('fetch error => ', err)
      })
    } else {
      // 不支持fetch，使用原生XMLHttpRequest对象
    }
  }
  /**
   * @method 捕获信息
   * @param {Object} options Sentry SDK 配置项对象
   * @document basic options => https://develop.sentry.dev/sdk/event-payloads
   * @document message options => https://develop.sentry.dev/sdk/event-payloads/message/
   */
  Sentry.captureMessage = function(options) {
    // 禁止上传日志
    if (!Sentry.enabled) return;
    // 非法地配置项对象参数
    if (typeof options !== 'object' || options === null) {
      outputMsg('method "captureMessage" must pass a object variable, please check again!', 'error');
      return;
    }
    // 非法信息数据
    if (typeof options.message !== 'object' || options.message === null) {
      outputMsg('method "captureMessage" must pass the value of "message" on options params, please check again!', 'error');
      return;
    }
    // 上传日志
    Sentry.uploadLog(options)
  }
}.call(this));
