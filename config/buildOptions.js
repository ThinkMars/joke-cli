import { merge } from 'webpack-merge'
import { baseOptions } from './baseOptions.js'

export const buildOptions = merge(baseOptions, {
  mode: 'production',
})