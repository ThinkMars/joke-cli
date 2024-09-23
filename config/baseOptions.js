import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { workspaceRoot } from '../tools.js'

export const baseOptions = {
  entry: {
    index: path.resolve(workspaceRoot, 'src/index.ts'),
    polyfills: path.resolve(workspaceRoot, 'src/polyfills'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new ForkTsCheckerWebpackPlugin(), // 开启ts的话需要tsconfig文件
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'less-loader',], // 逆序执行
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/, 
        use: [
          {
            loader: 'ts-loader',
            // options: {
            //   transpileOnly: true,
            // },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(workspaceRoot, 'dist'),
    clean: true,
  },
  optimization: {
    usedExports: true, // 只导出被使用的模块，使用 Tree Shaking，tenser-plugin
    runtimeChunk: 'single', // 将 runtime 代码拆分为一个单独的 chunk
    moduleIds: 'deterministic', // 使用确定的模块 id，以便更好地缓存
    splitChunks: {
      // chunks: 'all', // 将所有模块都进行拆分

      // 由于像 lodash 或 react 这样的第三方库很少像本地源代码一样频繁修改，因此通常推荐将第三方库提取到单独的 vendor chunk 中。
      cacheGroups: { // 缓存组
        vendor: { // 第三方库
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all' // 将所有模块都进行拆分
        }
      }
    },
    minimizer: [new CssMinimizerPlugin()], // 使用 css-minimizer-webpack-plugin 压缩 css
  },
  externals: {
    // lodash: {
    //   lodash: {
    //     commonjs: 'lodash', // 如果使用的是 commonjs 模块
    //     commonjs2: 'lodash', // 如果使用的是 commonjs2 模块
    //     amd: 'lodash', // 如果使用的是 amd 模块
    //     root: '_', // 如果使用的是全局变量
    //   },
    // }
  }
};