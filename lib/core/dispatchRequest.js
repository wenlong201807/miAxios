var defaults = require('../defaults')
module.exports = function dispatchRequest(config) {
    // console.log('dispatchRequest', config)
    var adapter = defaults.adapter; //  此为函数，自己添加上来的，
    return adapter(config).then(function onAdapterResolution(response) {
        // return response + ' dispatchRequest-adapter-成功的'
        return response;
    }, function onAdapterRejection(reason) {
        // throw reason + 'dispatchRequest-adapter-失败的'
        console.log('中断操作进这里----')
        throw reason;
    })
}
