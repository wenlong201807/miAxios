
var defaults = require('./defaults')
var Axios = require('./core/Axios')

function createInstance(defaultConfig) {
  console.log('createInstance', defaultConfig)
  var context = new Axios(defaultConfig);
  console.log('context', JSON.stringify(context))
  // TODO
  var instance = Axios.prototype.request.bind(context) // 改变了指向#难点
  // utils.extend(instance, Axios.prototype)
  // utils.extend(instance, context)
  console.log('instance', instance)
  return instance
}
var axios = createInstance(defaults);

// createInstance({
//   gsd: 'gsd--测试实力--666-77-88'
// })
// axios.CancelToken = require('./cancel/CancelToken');
window.axios = axios // 挂载到浏览器上
module.exports = axios






















