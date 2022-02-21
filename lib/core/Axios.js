var dispatchRequest = require('./dispatchRequest');
var InterceptorManager = require('./InterceptorManager');
var mergeConfig = require('./mergeConfig');
var utils = require('../utils');

function Axios(instanceConfig) {
  // console.log('Axios:', instanceConfig);
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

/**
 * axios({ url, method }) 方式调用此方法
 */
Axios.prototype.request = function request(config) {
  // post 方法是会用到
  config = mergeConfig(this.defaults, config);
  console.log('request-config', config);

  var promise;
  promise = Promise.resolve(config); // Promise.resolve 异步化操作核心在此

  // 请求拦截器放在前面 unshift
  var requestInterceptorChain = [];

  // 使用了遍历的方式添加，所以即使有多个拦截器，也都能添加进来
  // TODO 源码中 没有 .handlers 这一层属性，如何去掉的，再查？？
  this.interceptors.request.handlers.forEach((interceptor) => {
    requestInterceptorChain.unshift(
      interceptor.fulfilled,
      interceptor.rejected
    );
  });
  // console.log('requestInterceptorChain', requestInterceptorChain);

  // 响应拦截器放在后面处理 push
  var responseInterceptorChain = [];
  this.interceptors.response.handlers.forEach((interceptor) => {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  // console.log('responseInterceptorChain', responseInterceptorChain);
  var chain = [dispatchRequest, undefined]; // promise 有两个参数，第一个成功，第二个失败，保持结构统一，必须每次都两项

  // 请求接口数据的链式内容，通过apply 将拦截器的内容前后增加进来 -> 所有内容都放在了chain中
  Array.prototype.unshift.apply(chain, requestInterceptorChain);
  Array.prototype.push.apply(chain, responseInterceptorChain);

  // 此时，拦截器已经加入在此处理了
  while (chain.length) {
    // promise 返回 promise 的根源在此，并且 是由限量的链式调用
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
};

// Axios.prototype.get = function get(config) {
//   console.log('get-config', config);
// };
utils.forEach(
  ['delete', 'get', 'head', 'options'],
  function forEachMethodNoData(method) {
    Axios.prototype[method] = function (url, config) {
      // Axios.prototype.request === this.request
      return this.request(
        mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data,
        })
      );
    };
  }
);

// 可以传入后端正确数据，状态码不是200
utils.forEach(
  ['post', 'put', 'patch'],
  function forEachMethodWithData(method) {
    Axios.prototype[method] = function (url, data, config) {
      // Axios.prototype.request === this.request
      return this.request(
        mergeConfig(config || {}, {
          method: method,
          url: url,
          data: data,
        })
      );
    };
  }
);

Axios.prototype.getUri = function getUri(config) {
  console.log('getUri-config', config);
};

module.exports = Axios;
