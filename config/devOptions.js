import { merge } from 'webpack-merge'
import { baseOptions } from './baseOptions.js'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export const devOptions = merge(baseOptions, {
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