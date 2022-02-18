import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';

export default {
  input: 'lib/axios.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'axios',
  },
  plugins: [
    resolve(),
    commonjs(),
    // 本地服务器
    serve({
      open: true, // 自动打开页面
      port: 8008,
      openPage: './index.html', // 打开的页面
      contentBase: '',
    }),
  ],
};
