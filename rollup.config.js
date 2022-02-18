import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';

export default {
  input: 'lib/axios.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // 生成立即执行函数
    name: 'axios',
  },
  plugins: [
    resolve(),
    commonjs(),
    // 本地服务器
    serve({
      open: true, // 自动打开页面 // 无效
      host: 'localhost',
      port: 8008,
      openPage: './index.html', // 打开的页面 // 未测试
      verbose: true, // 无效
      contentBase: '', // 未测试
      headers: { // 未测试
        'Access-Control-Allow-Origin': '*',
        foo: 'bar'
      },
    //   onListening: function (server) { // 失败，用法错误
    //     const address = server.getAddress()
    //     const host = address.host === '::' ? 'localhost' : address.host
    //     // by using a bound function, we can access options as `this`
    //     const protocol = this.https ? 'https' : 'http'
    //     console.log(`Server listening at ${protocol}://${host}:${address.port}/`)
    //   }
    }),
  ],
};
