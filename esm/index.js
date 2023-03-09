var _errorMessages;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var moduleName = 'sentry-js-sdk';
/**
 * @method 控制台输出信息
 */
function outputMsg(msg, level) {
  var key = level || 'log';
  if (console.hasOwnProperty(key)) {
    console[key]("Module \"".concat(moduleName, "\" ").concat(key, " message => ").concat(msg));
  } else {
    console.log("Module \"".concat(moduleName, "\" debug message => ").concat(msg));
  }
}

/**
 * @method 是否是对象
 */
var isObject = function isObject(data) {
  return _typeof(data) === 'object' && data !== null && !Array.isArray(data);
};

/**
 * @method 对象深合并
 */
function deepMerge(target) {
  // 用于跟踪对象的引用
  var seen = new WeakSet();
  var merge = function merge(target, source) {
    if (_typeof(target) !== 'object' || _typeof(source) !== 'object') {
      return source;
    }
    if (seen.has(source)) {
      return source;
    }
    seen.add(source);
    var result = Array.isArray(target) ? _toConsumableArray(target) : Object.assign({}, target);
    if (Array.isArray(source)) {
      for (var i = 0; i < source.length; i++) {
        result[i] = i in target ? merge(target[i], source[i]) : source[i];
      }
    } else {
      for (var key in source) {
        var sourceValue = source[key];
        var targetValue = result[key];
        result[key] = _typeof(sourceValue) === 'object' && sourceValue !== null ? _typeof(targetValue) === 'object' && targetValue !== null ? merge(targetValue, sourceValue) : sourceValue : sourceValue;
      }
    }
    seen["delete"](source);
    return result;
  };
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  sources.forEach(function (source) {
    target = merge(target, source);
  });
  return target;
}

/** 1KB大小 */
var SIZE_KB = 1024;
/** 1MB大小 */
var SIZE_MB = Math.pow(SIZE_KB, 2);
/** 1GB大小 */
var SIZE_GB = Math.pow(SIZE_KB, 3);
/** 日志抛送数据大小限制 - 20MB */
var limitSize = 20 * SIZE_MB;
/**
 * @method 获取字符串数据的字节数
 */
var byteSize = function byteSize(str) {
  return new Blob([str]).size;
};
/**
 * @method 是否超过数据大小上限
 */
var isOversized = function isOversized(str) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : limitSize;
  return byteSize(str) > size;
};
/**
 * @method 获取数据大小（带单位）
 */
var getDataSizeString = function getDataSizeString(val) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (typeof val !== 'number' || val <= 0) return '';
  if (val > SIZE_GB) {
    return "".concat((val / SIZE_GB).toFixed(digits), "G");
  } else if (val > SIZE_MB) {
    return "".concat((val / SIZE_MB).toFixed(digits), "M");
  } else if (val > SIZE_KB) {
    return "".concat((val / SIZE_KB).toFixed(digits), "K");
  } else {
    return "".concat(val, "B");
  }
};

/**
 * @method 是否支持原生的fetch方法
 */
function isNativeFetch(func) {
  return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
/**
 * @method 判断是否支持fetch
 */
function isSupportedFetch() {
  if (!window.fetch) return false;
  try {
    new Headers();
    new Request('');
    new Response();
    return isNativeFetch(window.fetch);
  } catch (e) {
    return false;
  }
}

/** http状态码 - Ok */
var HTTP_STATUS_SUCCESS = 200;
/** http状态码 - Bad Request */
var HTTP_STATUS_BAD_REQUEST = 400;
/** http状态码 - Too Many Requests */
var HTTP_STATUS_TOO_MANY_REQUESTS = 429;
/** http状态码 - Internal Server Error */
var HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
/** 禁止重新请求的http状态码集合 */
var DISABLE_RETRY_HTTP_STATUS_LIST = [HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_TOO_MANY_REQUESTS];
/** http请求 - 最大重试次数 */
var MAX_RETRIES = 1;
/** http请求 - 延迟重试请求时间（单位：毫秒） */
var RETRY_DELAY = 1000;

/**
 * @method 支持retry的fetch请求
 */
function fetchWithRetry(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var externalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _this = this;
    var retryCount, maxRetries, retryDelay, fetchPromise, retry;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          retryCount = 0;
          maxRetries = typeof externalOptions.maxRetries === 'number' ? externalOptions.maxRetries : MAX_RETRIES;
          retryDelay = typeof externalOptions.retryDelay === 'number' ? externalOptions.retryDelay : RETRY_DELAY;
          /**
           * @method 具有状态过滤、数据解析的fetch
           */
          fetchPromise = function fetchPromise() {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", fetch(url, options).then(function (response) {
                      if (!response.ok) {
                        var error = new Error("Failed with status ".concat(response.status));
                        error.status = response.status;
                        throw error;
                      }
                      return response.json();
                    }));
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
          };
          /**
           * @method 重试请求
           */
          retry = function retry() {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    retryCount++;
                    if (!(retryCount <= maxRetries)) {
                      _context2.next = 5;
                      break;
                    }
                    return _context2.abrupt("return", new Promise(function (resolve) {
                      setTimeout(function () {
                        // console.log(`Retrying ${url}... (attempt ${retryCount} of ${maxRetries})`)
                        resolve(fetchPromise());
                      }, retryDelay);
                    }).then(function (retryResult) {
                      return retryResult;
                    })["catch"](function () {
                      return retry();
                    }));
                  case 5:
                    throw new Error("Max retries (".concat(maxRetries, ") exceeded for ").concat(url));
                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
          };
          return _context3.abrupt("return", fetchPromise()["catch"](function (err) {
            if (err.status && DISABLE_RETRY_HTTP_STATUS_LIST.includes(err.status)) {
              throw err;
            }
            return retry();
          }));
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
}

/** 允许的请求方式集合 */
var allowMethods = ['GET', 'POST', 'HEAD', 'PUT', 'OPTIONS', 'DELETE', 'CONNECT'];
/**
 * @method 支持retry的XMLHttpRequest
 */
function xhrWithRetry(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var externalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var _this2 = this;
    var retryCount, maxRetries, retryDelay, headers, body, method, xhrPromise, retry;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          retryCount = 0;
          maxRetries = typeof externalOptions.maxRetries === 'number' ? externalOptions.maxRetries : MAX_RETRIES;
          retryDelay = typeof externalOptions.retryDelay === 'number' ? externalOptions.retryDelay : RETRY_DELAY;
          headers = isObject(options.headers) ? options.headers : {};
          body = options.body;
          method = typeof options.method === 'string' && allowMethods.includes(options.method) ? options.method : 'GET';
          /**
           * @method 具有状态过滤、数据解析、支持Promise的XMLHttpRequest
           */
          xhrPromise = function xhrPromise() {
            return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", new Promise(function (resolve, reject) {
                      var xhr = new XMLHttpRequest();
                      xhr.onerror = function (err) {
                        return reject(err);
                      };
                      xhr.onload = function () {
                        if (xhr.readyState === 4 && xhr.status === HTTP_STATUS_SUCCESS && xhr.response) {
                          var res = JSON.parse(xhr.response);
                          resolve(res);
                        } else {
                          var error = new Error("Failed with status ".concat(xhr.status));
                          error.status = xhr.status;
                          reject(error);
                        }
                      };
                      xhr.open(method, url);
                      for (var key in headers) {
                        if (Object.prototype.hasOwnProperty.call(headers, key)) {
                          xhr.setRequestHeader(key, headers[key]);
                        }
                      }
                      xhr.send(body);
                    }));
                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
          };
          /**
           * @method 重试请求
           */
          retry = function retry() {
            return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    retryCount++;
                    if (!(retryCount <= maxRetries)) {
                      _context5.next = 5;
                      break;
                    }
                    return _context5.abrupt("return", new Promise(function (resolve) {
                      setTimeout(function () {
                        // console.log(`Retrying ${url}... (attempt ${retryCount} of ${maxRetries})`)
                        resolve(xhrPromise());
                      }, retryDelay);
                    }).then(function (retryResult) {
                      return retryResult;
                    })["catch"](function () {
                      return retry();
                    }));
                  case 5:
                    throw new Error("Max retries (".concat(maxRetries, ") exceeded for ").concat(url));
                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
          };
          return _context6.abrupt("return", xhrPromise()["catch"](function (err) {
            if (err.status && DISABLE_RETRY_HTTP_STATUS_LIST.includes(err.status)) {
              throw err;
            }
            return retry();
          }));
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
}

/**
 * @method http请求
 */
function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var externalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", isSupportedFetch() ? fetchWithRetry(url, options, externalOptions) : xhrWithRetry(url, options, externalOptions));
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
}

/** 状态码提示信息对象 */
var errorMessages = (_errorMessages = {}, _defineProperty(_errorMessages, HTTP_STATUS_BAD_REQUEST, 'Bad Request'), _defineProperty(_errorMessages, HTTP_STATUS_TOO_MANY_REQUESTS, 'Too Many Requests'), _defineProperty(_errorMessages, HTTP_STATUS_INTERNAL_SERVER_ERROR, 'Internal Server Error'), _errorMessages);
/**
 * @method 解析response
 */
function parseResponse(res) {
  return {
    code: 0,
    data: res,
    message: ''
  };
}
/**
 * @method 解析error
 */
function parseError(err) {
  var code = HTTP_STATUS_INTERNAL_SERVER_ERROR;
  if (err.status && typeof err.status === 'number' && err.status < 1000 && errorMessages[err.status]) {
    code = err.status;
  }
  return {
    code: code,
    data: null,
    message: errorMessages[code]
  };
}
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
var errorStackParserExports = {};
var errorStackParser = {
  get exports() {
    return errorStackParserExports;
  },
  set exports(v) {
    errorStackParserExports = v;
  }
};
var stackframeExports = {};
var stackframe = {
  get exports() {
    return stackframeExports;
  },
  set exports(v) {
    stackframeExports = v;
  }
};
var hasRequiredStackframe;
function requireStackframe() {
  if (hasRequiredStackframe) return stackframeExports;
  hasRequiredStackframe = 1;
  (function (module, exports) {
    (function (root, factory) {
      // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

      /* istanbul ignore next */
      {
        module.exports = factory();
      }
    })(commonjsGlobal, function () {
      function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      }
      function _getter(p) {
        return function () {
          return this[p];
        };
      }
      var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
      var numericProps = ['columnNumber', 'lineNumber'];
      var stringProps = ['fileName', 'functionName', 'source'];
      var arrayProps = ['args'];
      var objectProps = ['evalOrigin'];
      var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);
      function StackFrame(obj) {
        if (!obj) return;
        for (var i = 0; i < props.length; i++) {
          if (obj[props[i]] !== undefined) {
            this['set' + _capitalize(props[i])](obj[props[i]]);
          }
        }
      }
      StackFrame.prototype = {
        getArgs: function getArgs() {
          return this.args;
        },
        setArgs: function setArgs(v) {
          if (Object.prototype.toString.call(v) !== '[object Array]') {
            throw new TypeError('Args must be an Array');
          }
          this.args = v;
        },
        getEvalOrigin: function getEvalOrigin() {
          return this.evalOrigin;
        },
        setEvalOrigin: function setEvalOrigin(v) {
          if (v instanceof StackFrame) {
            this.evalOrigin = v;
          } else if (v instanceof Object) {
            this.evalOrigin = new StackFrame(v);
          } else {
            throw new TypeError('Eval Origin must be an Object or StackFrame');
          }
        },
        toString: function toString() {
          var fileName = this.getFileName() || '';
          var lineNumber = this.getLineNumber() || '';
          var columnNumber = this.getColumnNumber() || '';
          var functionName = this.getFunctionName() || '';
          if (this.getIsEval()) {
            if (fileName) {
              return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
            }
            return '[eval]:' + lineNumber + ':' + columnNumber;
          }
          if (functionName) {
            return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
          }
          return fileName + ':' + lineNumber + ':' + columnNumber;
        }
      };
      StackFrame.fromString = function StackFrame$$fromString(str) {
        var argsStartIndex = str.indexOf('(');
        var argsEndIndex = str.lastIndexOf(')');
        var functionName = str.substring(0, argsStartIndex);
        var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
        var locationString = str.substring(argsEndIndex + 1);
        if (locationString.indexOf('@') === 0) {
          var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
          var fileName = parts[1];
          var lineNumber = parts[2];
          var columnNumber = parts[3];
        }
        return new StackFrame({
          functionName: functionName,
          args: args || undefined,
          fileName: fileName,
          lineNumber: lineNumber || undefined,
          columnNumber: columnNumber || undefined
        });
      };
      for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = function (p) {
          return function (v) {
            this[p] = Boolean(v);
          };
        }(booleanProps[i]);
      }
      for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = function (p) {
          return function (v) {
            if (!_isNumber(v)) {
              throw new TypeError(p + ' must be a Number');
            }
            this[p] = Number(v);
          };
        }(numericProps[j]);
      }
      for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = function (p) {
          return function (v) {
            this[p] = String(v);
          };
        }(stringProps[k]);
      }
      return StackFrame;
    });
  })(stackframe);
  return stackframeExports;
}
(function (module, exports) {
  (function (root, factory) {
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    {
      module.exports = factory(requireStackframe());
    }
  })(commonjsGlobal, function ErrorStackParser(StackFrame) {
    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
    return {
      /**
       * Given an Error object, extract the most information from it.
       *
       * @param {Error} error object
       * @return {Array} of StackFrames
       */
      parse: function ErrorStackParser$$parse(error) {
        if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
          return this.parseOpera(error);
        } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
          return this.parseV8OrIE(error);
        } else if (error.stack) {
          return this.parseFFOrSafari(error);
        } else {
          throw new Error('Cannot parse given Error object');
        }
      },
      // Separate line and column numbers from a string of the form: (URI:Line:Column)
      extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
        // Fail-fast but return locations like "(native)"
        if (urlLike.indexOf(':') === -1) {
          return [urlLike];
        }
        var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
        var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
        return [parts[1], parts[2] || undefined, parts[3] || undefined];
      },
      parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !!line.match(CHROME_IE_STACK_REGEXP);
        }, this);
        return filtered.map(function (line) {
          if (line.indexOf('(eval ') > -1) {
            // Throw away eval information until we implement stacktrace.js/stackframe#8
            line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '');
          }
          var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').replace(/^.*?\s+/, '');

          // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
          // case it has spaces in it, as the string is split on \s+ later on
          var location = sanitizedLine.match(/ (\(.+\)$)/);

          // remove the parenthesized location from the line, if it was matched
          sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

          // if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
          // because this line doesn't have function name
          var locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
          var functionName = location && sanitizedLine || undefined;
          var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
          return new StackFrame({
            functionName: functionName,
            fileName: fileName,
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }, this);
      },
      parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !line.match(SAFARI_NATIVE_CODE_REGEXP);
        }, this);
        return filtered.map(function (line) {
          // Throw away eval information until we implement stacktrace.js/stackframe#8
          if (line.indexOf(' > eval') > -1) {
            line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
          }
          if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
            // Safari eval frames only have function names and nothing else
            return new StackFrame({
              functionName: line
            });
          } else {
            var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
            var matches = line.match(functionNameRegex);
            var functionName = matches && matches[1] ? matches[1] : undefined;
            var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
            return new StackFrame({
              functionName: functionName,
              fileName: locationParts[0],
              lineNumber: locationParts[1],
              columnNumber: locationParts[2],
              source: line
            });
          }
        }, this);
      },
      parseOpera: function ErrorStackParser$$parseOpera(e) {
        if (!e.stacktrace || e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
          return this.parseOpera9(e);
        } else if (!e.stack) {
          return this.parseOpera10(e);
        } else {
          return this.parseOpera11(e);
        }
      },
      parseOpera9: function ErrorStackParser$$parseOpera9(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        var lines = e.message.split('\n');
        var result = [];
        for (var i = 2, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);
          if (match) {
            result.push(new StackFrame({
              fileName: match[2],
              lineNumber: match[1],
              source: lines[i]
            }));
          }
        }
        return result;
      },
      parseOpera10: function ErrorStackParser$$parseOpera10(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        var lines = e.stacktrace.split('\n');
        var result = [];
        for (var i = 0, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);
          if (match) {
            result.push(new StackFrame({
              functionName: match[3] || undefined,
              fileName: match[2],
              lineNumber: match[1],
              source: lines[i]
            }));
          }
        }
        return result;
      },
      // Opera 10.65+ Error.stack very similar to FF/Safari
      parseOpera11: function ErrorStackParser$$parseOpera11(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
        }, this);
        return filtered.map(function (line) {
          var tokens = line.split('@');
          var locationParts = this.extractLocation(tokens.pop());
          var functionCall = tokens.shift() || '';
          var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^)]*\)/g, '') || undefined;
          var argsRaw;
          if (functionCall.match(/\(([^)]*)\)/)) {
            argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
          }
          var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
          return new StackFrame({
            functionName: functionName,
            args: args,
            fileName: locationParts[0],
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }, this);
      }
    };
  });
})(errorStackParser);
var ErrorStackParser = errorStackParserExports;

/** Sentry DSN 正则 */
var dsnReg = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
/** Sentry SDK 版本号 */
var sdkVersion = '1.0.0';
/** Sentry SDK 名称 */
var sdkName = 'sentry.javascript.browser';
/** Sentry SDK 基本配置项 */
var basicOptions = {
  dsn: '',
  enabled: true,
  platform: 'javascript',
  level: 'error',
  serverName: window.location.hostname,
  environment: 'production',
  envelope: true // 是否使用envelope接口上报数据
};
/** 初始化的 Sentry Scope User 基本配置项 */
var initUserOptions = {
  ip_address: '{{auto}}' // 用户ip地址，此处默认为服务器自动获取
};
/** Sentry Scope User 配置项 */
var userOptions = Object.assign({}, initUserOptions);
/** Sentry Scope Tags 配置项 */
var tagOptions = {};
/** Sentry Scope Extra 配置项 */
var extraOptions = {};
/**
 * @method 获取request options
 */
function getRequestOptions() {
  return {
    method: 'GET',
    url: window.location.href,
    headers: {
      Referer: window.document.referrer,
      'User-Agent': window.navigator.userAgent
    }
  };
}
/**
 * @method 设置用户信息
 * @document https://develop.sentry.dev/sdk/event-payloads/user/
 */
function setUser(options) {
  if (_typeof(options) !== 'object') {
    outputMsg('Method "setUser" must pass a object parameter, please check again!', 'error');
    return;
  }
  if (options) {
    userOptions = Object.assign(Object.assign({}, userOptions), options);
  } else {
    userOptions = Object.assign({}, initUserOptions);
  }
}
/**
 * @method 设置自定义标签信息
 */
function setTag(key, value) {
  if (typeof key !== 'string' || typeof value !== 'string') {
    outputMsg('Method "setTag" must pass two string parameter, please check again!', 'error');
    return;
  }
  tagOptions[key] = value;
}
/**
 * @method 移除自定义标签信息
 */
function removeTag(key) {
  if (typeof key !== 'string') {
    outputMsg('The parameter "key" of method "removeTag" must pass a string value, please check again!', 'error');
    return;
  }
  delete tagOptions[key];
}
/**
 * @method 设置自定义扩展信息
 */
function setExtra(key, value) {
  if (typeof key !== 'string') {
    outputMsg('The parameter "key" of method "setExtra" must pass a string value, please check again!', 'error');
    return;
  }
  extraOptions[key] = value;
}
/**
 * @method 移除自定义扩展信息
 */
function removeExtra(key) {
  if (typeof key !== 'string') {
    outputMsg('The parameter "key" of method "removeExtra" must pass a string value, please check again!', 'error');
    return;
  }
  delete extraOptions[key];
}
/**
 * @method 清空之前的 Scope User 配置
 */
function clearUserOptions() {
  userOptions = Object.assign({}, initUserOptions);
}
/**
 * @method 清空之前的 Scope Tags 配置
 */
function clearTagOptions() {
  tagOptions = {};
}
/**
 * @method 清空之前的 Scope Extra 配置
 */
function clearExtraOptions() {
  extraOptions = {};
}
/**
 * @method 清空所有Scope配置
 */
function clear() {
  clearUserOptions();
  clearTagOptions();
  clearExtraOptions();
}
/**
 * @method 使用全局的Scope
 */
function configureScope(callback) {
  if (typeof callback !== 'function') {
    outputMsg('Method "configureScope" must pass a function value on parameter "callback", please check again!', 'error');
    return;
  }
  callback({
    setUser: setUser,
    setTag: setTag,
    removeTag: removeTag,
    setExtra: setExtra,
    removeExtra: removeExtra,
    clear: clear
  });
}
/**
 * @method 初始化SDK
 */
function init(options) {
  // 非法地配置项对象参数
  if (!isObject(options)) {
    outputMsg('Method "init" must pass a object value, please check again!', 'error');
    return;
  }
  // 非法的dsn参数
  if (typeof options.dsn !== 'string') {
    outputMsg('Method "init" must pass the value of "dsn" on options params, please check again!', 'error');
    return;
  }
  // 非法的dsn格式
  if (!dsnReg.test(options.dsn)) {
    outputMsg('"dsn" must be a valid value, please check again!', 'error');
    return;
  }
  // 设置dsn
  basicOptions.dsn = options.dsn;
  // 合法的enabled参数值
  if (typeof options.enabled === 'boolean') {
    basicOptions.enabled = options.enabled;
  }
  // 合法的envelope参数值
  if (typeof options.envelope === 'boolean') {
    basicOptions.envelope = options.envelope;
  }
}
/**
 * @method 解析DSN地址
 */
function parseDSN() {
  // 非法的dns
  if (!basicOptions.dsn) {
    outputMsg('Please check if the "init" method was called!', 'error');
    return {
      uri: '',
      publicKey: '',
      projectId: ''
    };
  }
  var matches = dsnReg.exec(basicOptions.dsn);
  var nodes = matches ? matches.slice(1) : [];
  // const [protocol, publicKey, _ = '', host, port = '', projectId] = nodes
  var protocol = nodes[0];
  var publicKey = nodes[1];
  var host = nodes[3];
  var port = nodes[4] || '';
  var projectId = nodes[5];
  return {
    uri: "".concat(protocol, "://").concat(host).concat(port, "/api/"),
    publicKey: publicKey,
    projectId: projectId
  };
}
/**
 * @method 获取api地址
 */
function getAPIAddress() {
  var key = basicOptions.envelope ? 'envelope' : 'store';
  var basicRequestOptions = parseDSN();
  var url = "".concat(basicRequestOptions.uri).concat(basicRequestOptions.projectId, "/").concat(key, "/?sentry_version=7&sentry_client=").concat(sdkName).concat(sdkVersion, "&sentry_key=").concat(basicRequestOptions.publicKey);
  return url;
}
/**
 * @method 获取store接口请求配置
 */
function getStoreOptions(options) {
  // 非法的日志信息
  if (!isObject(options)) {
    outputMsg('Method "getStoreOptions" must pass a object value, please check again!', 'error');
    return {
      url: '',
      headers: {},
      payload: ''
    };
  }
  // 构造请求头
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  // 解构需要独立处理的配置项
  var _options$user = options.user,
    user = _options$user === void 0 ? {} : _options$user,
    _options$request = options.request,
    request = _options$request === void 0 ? {} : _options$request,
    _options$tags = options.tags,
    tags = _options$tags === void 0 ? {} : _options$tags,
    _options$extra = options.extra,
    extra = _options$extra === void 0 ? {} : _options$extra,
    _options$platform = options.platform,
    platform = _options$platform === void 0 ? basicOptions.platform : _options$platform,
    _options$level = options.level,
    level = _options$level === void 0 ? basicOptions.level : _options$level,
    _options$server_name = options.server_name,
    server_name = _options$server_name === void 0 ? basicOptions.serverName : _options$server_name,
    _options$environment = options.environment,
    environment = _options$environment === void 0 ? basicOptions.environment : _options$environment,
    restOptions = __rest(options
    // 构造目标请求数据
    , ["user", "request", "tags", "extra", "platform", "level", "server_name", "environment"]);
  // 构造目标请求数据
  var payload = Object.assign({
    platform: platform,
    level: level,
    server_name: server_name,
    environment: environment,
    timestamp: new Date().toISOString(),
    user: Object.assign(Object.assign({}, userOptions), user),
    sdk: {
      name: sdkName,
      version: sdkVersion
    },
    request: deepMerge(getRequestOptions(), request),
    tags: Object.assign(Object.assign({}, tagOptions), tags),
    extra: deepMerge(extraOptions, extra)
  }, restOptions);
  return {
    url: getAPIAddress(),
    headers: headers,
    payload: JSON.stringify(payload)
  };
}
/**
 * @method 通过envelope接口请求配置
 * @document https://develop.sentry.dev/sdk/envelopes/#serialization-format
 */
function getEnvelopeOptions(options) {
  // 非法的日志信息
  if (!isObject(options)) {
    outputMsg('Method "getEnvelopeOptions" must pass a object value, please check again!', 'error');
    return {
      url: '',
      headers: {},
      payload: ''
    };
  }
  // 解构需要独立处理的配置项
  var _options$user2 = options.user,
    user = _options$user2 === void 0 ? {} : _options$user2,
    _options$request2 = options.request,
    request = _options$request2 === void 0 ? {} : _options$request2,
    _options$tags2 = options.tags,
    tags = _options$tags2 === void 0 ? {} : _options$tags2,
    _options$extra2 = options.extra,
    extra = _options$extra2 === void 0 ? {} : _options$extra2,
    _options$type = options.type,
    type = _options$type === void 0 ? 'event' : _options$type,
    _options$platform2 = options.platform,
    platform = _options$platform2 === void 0 ? basicOptions.platform : _options$platform2,
    _options$level2 = options.level,
    level = _options$level2 === void 0 ? basicOptions.level : _options$level2,
    _options$server_name2 = options.server_name,
    server_name = _options$server_name2 === void 0 ? basicOptions.serverName : _options$server_name2,
    _options$environment2 = options.environment,
    environment = _options$environment2 === void 0 ? basicOptions.environment : _options$environment2,
    _options$event_id = options.event_id,
    event_id = _options$event_id === void 0 ? '' : _options$event_id,
    restOptions = __rest(options, ["user", "request", "tags", "extra", "type", "platform", "level", "server_name", "environment", "event_id"]);
  var headers = {};
  // 构造目标请求数据
  var targetPayload = Object.assign({
    platform: platform,
    level: level,
    server_name: server_name,
    environment: environment,
    type: type,
    user: Object.assign(Object.assign({}, userOptions), user),
    request: deepMerge(getRequestOptions(), request),
    tags: Object.assign(Object.assign({}, tagOptions), tags),
    extra: deepMerge(extraOptions, extra)
  }, restOptions);
  var payloadHeaders = Object.assign({
    sent_at: new Date().toISOString(),
    sdk: {
      name: sdkName,
      version: sdkVersion
    }
  }, event_id && {
    event_id: event_id
  });
  var payloadItem = {
    type: type
  };
  var payload = JSON.stringify(payloadHeaders) + '\n' + JSON.stringify(payloadItem) + '\n' + JSON.stringify(targetPayload) + '\n';
  return {
    url: getAPIAddress(),
    headers: headers,
    payload: payload
  };
}
/**
 * @method 上传日志到服务器
 */
function uploadLog(options) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var requestOptions, url, headers, payload;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          requestOptions = basicOptions.envelope ? getEnvelopeOptions(options) : getStoreOptions(options);
          url = requestOptions.url;
          headers = requestOptions.headers;
          payload = requestOptions.payload; // 上传的日志内容超出限制大小
          if (!isOversized(payload)) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", Promise.reject("The current size of the log to be uploaded has exceeded the ".concat(getDataSizeString(limitSize), " limit")));
        case 6:
          return _context8.abrupt("return", request(url, {
            method: 'POST',
            headers: headers,
            body: payload
          }).then(parseResponse)["catch"](parseError));
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
}
/**
 * @method 捕获信息
 * @document basic options => https://develop.sentry.dev/sdk/event-payloads
 * @document message options => https://develop.sentry.dev/sdk/event-payloads/message/
 */
function captureMessage(message, options) {
  // 禁止上传日志
  if (!basicOptions.enabled) return;
  // 非法信息数据
  if (typeof message !== 'string' || message === '') {
    outputMsg('Method "captureMessage" must pass a valid string value on parameter "message", please check again!', 'error');
    return;
  }
  // 预设配置
  var presetOptions = {
    level: 'info'
  };
  // 如果没有可选配置项，直接抛数据
  if (typeof options === 'undefined') {
    // 上传日志
    return uploadLog(Object.assign({
      message: message
    }, presetOptions));
  }
  // 非法地配置项对象参数
  if (!isObject(options)) {
    outputMsg('Method "captureMessage" must pass a object value on parameter "options", please check again!', 'error');
    return;
  }
  // 存在可选配置项，则特殊处理message参数
  var _options$message = options.message,
    msg = _options$message === void 0 ? message : _options$message,
    restOptions = __rest(options
    // 上传日志
    , ["message"]);
  // 上传日志
  return uploadLog(Object.assign(Object.assign({
    message: msg
  }, presetOptions), restOptions));
}
/**
 * @method 捕获异常
 */
function captureException(err, options) {
  // 禁止上传日志
  if (!basicOptions.enabled) return;
  // 非法的err配置项
  if (_typeof(err) !== 'object' || !(err instanceof Error)) {
    outputMsg('Method "captureException" must pass a stantard instance of Error class on parameter "err", please check again!', 'error');
    return;
  }
  // 解析获取堆栈
  var stackFrames = ErrorStackParser.parse(err);
  var frames = [];
  // 存在有堆栈的场景下格式化堆栈信息
  if (stackFrames.length > 0) {
    frames = stackFrames.map(function (item) {
      return {
        "function": item.functionName || '',
        filename: item.fileName || '',
        abs_path: item.fileName || '',
        lineno: item.lineNumber,
        colno: item.columnNumber,
        in_app: true
      };
    });
  }
  var exceptionOption = {
    values: [{
      type: err.name,
      value: err.message,
      stacktrace: {
        frames: frames
      }
    }]
  };
  // 如果没有可选配置项，直接抛数据
  if (typeof options === 'undefined') {
    // 上传日志
    return uploadLog({
      exception: exceptionOption
    });
  }
  // 非法地配置项对象参数
  if (!isObject(options)) {
    outputMsg('Method "captureException" must pass a object value on parameter "options", please check again!', 'error');
    return;
  }
  // 存在可选配置项，则特殊处理exception参数
  var _options$exception = options.exception,
    exception = _options$exception === void 0 ? {} : _options$exception,
    restOptions = __rest(options
    // 上传日志
    , ["exception"]);
  // 上传日志
  return uploadLog(Object.assign({
    exception: Object.assign(Object.assign({}, exceptionOption), exception)
  }, restOptions));
}
export { captureException, captureMessage, configureScope, init };
