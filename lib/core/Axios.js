function Axios(instanceConfig) {
  console.log('Axios:', instanceConfig)
  this.defaults = instanceConfig;
  this.interceptors = {
      // request: new InterceptorManager(),
      // response: new InterceptorManager()
  }
}


Axios.prototype.request = function request(config) {
  console.log('request-config', config)
}

Axios.prototype.get = function get(config) {
  console.log('get-config', config)
}

Axios.prototype.getUri = function getUri(config) {
  console.log('getUri-config', config)
}


module.exports = Axios