function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
        adapter = require('./adapters/xhr');
    } else {
    }
    return adapter;
}
var defaults = {
    gsd2: 'gsd2',
    adapter: getDefaultAdapter(),
}
module.exports = defaults;
