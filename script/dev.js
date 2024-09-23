import path from 'node:path'
import { merge } from 'webpack-merge'
import { webpackBuild } from './webpack.js'
import { devOptions } from '../config/devOptions.js'
import { workspaceRoot } from '../tools.js'

export async function dev() {

  const jokeConfig = await import(path.resolve(workspaceRoot, './joke.config.js'))

  const finalOptions = merge(devOptions, jokeConfig.default)
  // console.log('finalOptions: ', finalOptions);
  webpackBuild(finalOptions)
}
