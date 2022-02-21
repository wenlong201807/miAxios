
var defaults = require('./defaults')
var Axios = require('./core/Axios')
var utils = require('./utils')

function createInstance(defaultConfig) {
  // console.log('createInstance', defaultConfig)
  var context = new Axios(defaultConfig);
  // console.log('context', context) // 构造函数的实例对象
  // TODO Axios.prototype.request.bind(context)没理解？？？
  var instance = Axios.prototype.request.bind(context) // 改变了指向#难点
  // var instance = Axios.prototype.request // 找不到 interceptors [构造函数中this的内容]
  // 将Axios.prototype 原型上的属性，方法，统统拷贝到 instance 实例上：实现 axios.get() 调用方式
  utils.extend(instance, Axios.prototype)
  // 将Axios 自身的this内部的属性，方法挂在到instance上
  // 拦截器放在这里了
  utils.extend(instance, context) // TODO [没理解？this上的属性、方法在这里合并进来了呀？]
  // console.dir 可以查看完整内容
  console.dir(instance) // 返回 Axios.prototype.request 函数体
  return instance
}
var axios = createInstance(defaults);

// createInstance({
//   gsd: 'gsd--测试实力--666-77-88'
// })

// 中断请求的数据挂载 这是一个函数
axios.CancelToken = require('./cancel/CancelToken'); 


window.axios = axios // 挂载到浏览器上
module.exports = axios // 模块暴露方式，可以require方式引入






















