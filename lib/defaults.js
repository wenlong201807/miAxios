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
    gsd2: 'gsd2',
    adapter: getDefaultAdapter(),
    validateStatus: function validateStatus(status) {
       return status >= 200 && status < 300; 
    }
}
module.exports = defaults;
