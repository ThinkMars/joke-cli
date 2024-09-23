import webpack from 'webpack'
import chalk from "chalk";
import ora from "ora";

export function webpackBuild(options) {
  const spinner = ora('building start...');
  spinner.start();

  return new Promise((resolve, reject) => {
    webpack(options, (err) => {
      if (err) {
        console.error(typeof err)
        reject(err)
        spinner.stop()
      } else {
        spinner.succeed(chalk.bgGreen.bold('build success!'))
        resolve()
      }
    })
  })

}
