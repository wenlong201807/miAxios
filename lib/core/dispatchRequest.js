var defaults = require('../defaults');
var utils = require('../utils');
var transformData = require('./transformData');
module.exports = function dispatchRequest(config) {
  // post 请求，必须要有请求内容类型的头部信息
  config.headers = config.headers || {};

  // Transform request data
  // post 请求需要有指定的headers信息，对应数据格式才能解析 
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  config.headers = utils.merge(
    config.headers[config.method] || {},
    config.headers
  );
  
  var adapter = defaults.adapter; //  此为函数，自己添加上来的，
  return adapter(config).then(
    function onAdapterResolution(response) {
      // return response + ' dispatchRequest-adapter-成功的'
      return response;
    },
    function onAdapterRejection(reason) {
      // throw reason + 'dispatchRequest-adapter-失败的'
      console.log('中断操作进这里----');
      throw reason;
    }
  );
};
