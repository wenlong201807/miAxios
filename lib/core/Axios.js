var dispatchRequest = require('./dispatchRequest');
var InterceptorManager = require('./InterceptorManager')

function Axios(instanceConfig) {
  // console.log('Axios:', instanceConfig);
  this.defaults = instanceConfig;
  this.interceptors = {
    // request: new InterceptorManager(),
    // response: new InterceptorManager()
  };
}

Axios.prototype.request = function request(config) {
  console.log('request-config', config);
  var promise;
  promise = Promise.resolve(config); // Promise.resolve 异步化操作核心在此
  var requestInterceptorChain = [];
  // this.interceptors.request.handlers.forEach((interceptor) => {
  //   requestInterceptorChain.unshift(
  //     interceptor.fulfilled,
  //     interceptor.rejected
  //   );
  // });
  console.log('requestInterceptorChain', requestInterceptorChain);
  var responseInterceptorChain = [];
  // this.interceptors.response.handlers.forEach((interceptor) => {
  //   responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  // });
  console.log('responseInterceptorChain', responseInterceptorChain);
  var chain = [dispatchRequest, undefined]; // promise 有两个参数，第一个成功，第二个失败，保持结构统一，必须每次都两项
  // Array.prototype.unshift.apply(chain, requestInterceptorChain);
  // Array.prototype.push.apply(chain, responseInterceptorChain);
  while (chain.length) { // promise 返回 promise 的根源在此，并且 是由限量的链式调用
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
};

Axios.prototype.get = function get(config) {
  console.log('get-config', config);
};

Axios.prototype.getUri = function getUri(config) {
  console.log('getUri-config', config);
};

module.exports = Axios;
