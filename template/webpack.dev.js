const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    clean: true,
    pathinfo: false, // 不输出文件路径信息
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true, // 开发环境开启压缩
  }
});