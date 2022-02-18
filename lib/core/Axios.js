function Axios(instanceConfig) {
  console.log('Axios:', instanceConfig)
  this.defaults = instanceConfig;
  this.interceptors = {
      // request: new InterceptorManager(),
      // response: new InterceptorManager()
  }
}


Axios.prototype.request = function request(config) {
  console.log('gsd1', config)
  // var promise;
  // promise = Promise.resolve(config);
  // var requestInterceptorChain = [];
  // this.interceptors.request.handlers.forEach(interceptor => {
  //     requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  // })
  // console.log('requestInterceptorChain', requestInterceptorChain)
  // var responseInterceptorChain = [];
  // this.interceptors.response.handlers.forEach(interceptor => {
  //     responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  // })
  // console.log('responseInterceptorChain', responseInterceptorChain)
  // var chain = [dispatchRequest, undefined];
  // Array.prototype.unshift.apply(chain, requestInterceptorChain);
  // Array.prototype.push.apply(chain, responseInterceptorChain);
  // while (chain.length) {
  //     promise = promise.then(chain.shift(), chain.shift());
  // }
  // return promise
}


module.exports = Axios