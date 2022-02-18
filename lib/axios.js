
var defaults = require('./defaults')
var Axios = require('./core/Axios')
var utils = require('./utils')

function createInstance(defaultConfig) {
  // console.log('createInstance', defaultConfig)
  var context = new Axios(defaultConfig);
  // console.log('context', context) // 构造函数的实例对象
  // TODO Axios.prototype.request.bind(context)没理解？？？
  var instance = Axios.prototype.request.bind(context) // 改变了指向#难点
  // 将Axios.prototype 原型上的属性，方法，统统拷贝到 instance 实例上：实现 axios.get() 调用方式
  utils.extend(instance, Axios.prototype)
  // utils.extend(instance, context) // 将Axios 自身的this内部的属性，方法挂在到instance上
  // console.log('instance', instance) // 返回 Axios.prototype.request 函数体
  return instance
}
var axios = createInstance(defaults);

// createInstance({
//   gsd: 'gsd--测试实力--666-77-88'
// })
// axios.CancelToken = require('./cancel/CancelToken');
window.axios = axios // 挂载到浏览器上
module.exports = axios // 模块暴露方式，可以require方式引入






















