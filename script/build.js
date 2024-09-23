import path from 'node:path'
import { merge } from 'webpack-merge'
import { webpackBuild } from './webpack.js'
import { buildOptions } from '../config/buildOptions.js'
import { workspaceRoot } from '../tools.js'

export async function build() {
  
  const jokeConfig = await import(path.resolve(workspaceRoot, './joke.config.js'))

  const finalOptions = merge(buildOptions, jokeConfig.default)

  webpackBuild(finalOptions)
}
