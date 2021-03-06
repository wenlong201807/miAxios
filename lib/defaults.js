var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');
var enhanceError = require('./core/enhanceError.simple');


var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}
function setContentTypeIfUnset(headers, value) {
  // 存在headers字段，并且没有设置Content-Type 时，那么就默认给添加上 Content-Type这个字段
  // 然后依据 接口参数类型，进行传入不同类型的value值
  if (
    !utils.isUndefined(headers) &&
    utils.isUndefined(headers['Content-Type'])
  ) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // console.log('getDefaultAdapter-adapter:', typeof XMLHttpRequest) // function
  // XMLHttpRequest 存在 则 为浏览器环境，否则 为nodejs环境
  if (typeof XMLHttpRequest !== 'undefined') {
    // 浏览器环境
    adapter = require('./adapters/xhr');
  } else {
    // TODO nodejs 环境
  }
  return adapter;
}
var defaults = {
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  gsd2: 'gsd2',
  adapter: getDefaultAdapter(),
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  transformRequest: [
    // 写成了数组的方式，数组的每一项是个函数
    function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');

      if (
        utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }

      // 处理对象字符串的数据
      // let params = new URLSearchParams();
      // params.append('title', 'json-server66');
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(
          headers,
          'application/x-www-form-urlencoded;charset=utf-8'
        );
        return data.toString(); // data是 isURLSearchParams对象, 获取不到的
      }
      if (
        utils.isObject(data) ||
        (headers && headers['Content-Type'] === 'application/json')
      ) {
        setContentTypeIfUnset(headers, 'application/json');
        return stringifySafely(data);
      }
      return data;
    },
  ],
  // TODO post 请求返回201 这里没有处理响应体内容
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data); // json -> obj 或者其他数据格式
      } catch (e) {
        // 严格模式报错测试，注意条件
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],
};

// 必须要有这个属性，才能再添加子属性
defaults.headers = {};

utils.forEach(
  ['delete', 'get', 'head', 'options'],
  function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  }
);

// 这几个方法必须要有指定的头部信息
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
