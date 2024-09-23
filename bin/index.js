#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { copy } from 'fs-extra'
import chalk from "chalk";
import ora from "ora";
import { $ } from "execa";
import { program } from "commander"
import inquirer from "inquirer";
import { isDirEmpty, __dirname, workspaceRoot } from '../tools.js'
import { build } from '../script/build.js'
import { dev } from '../script/dev.js'

const packageJson = JSON.parse(readFileSync(resolve(__dirname, './package.json'), 'utf8'))

// // 定义传参，并处理参数
// program.option('-a <num>', 'a test number', (num) => {
//   return Number.parseInt(num)
// })

// 1、定义命令
program.command('create <projectName>').action(createAction)

program.command('dev').description('start dev server').action(startDev)
program.command('build').description('start build for production').action(startBuild)

program.version(packageJson.version)

program.parse()

// 获取输入的参数
// console.log(program.opts());

// 设置字体颜色
console.log(chalk.bgBlue.red.bold("welcome to use joke-cli, heihei!!"));
// 创建加载动画器
const spinner = ora("creating...")

async function createAction(projectName) {
  console.log(projectName);
  
  // 2、提供交互式命令行
  const answers = await inquirer.prompt([
    // {
    //   type: 'input',
    //   name: 'template',
    //   message: 'input your template',
    //   default: 'common'
    // },
    {
      type: "list",
      name: "pkgManager",
      message: "select you package manager",
      default: 'pnpm',
      choices: ['pnpm', 'npm', 'yarn', 'other']
    }
  ])
  const { pkgManager } = answers

  // 3、加载动画
  spinner.start()

  // 4、复制模版
  isDirEmpty(workspaceRoot).then(isEmpty => {
    if (isEmpty) {
      copy(resolve(__dirname, './template/'), workspaceRoot, async err => {
        if (err) return console.error(err);

        spinner.text = chalk.grey.bold("installing dependencies...")

        //安装依赖时，可以用自己的依赖管理器，如果没有指定，则使用默认的pnpm
        if (pkgManager !== 'other') {
          await installDeps(pkgManager)
        }

        spinner.succeed(chalk.bgGreenBright.bold("created successfully!!"))
      })
    } else {
      spinner.fail(chalk.bgRedBright.bold("the current directory is not empty, please choose an empty directory"))
    }
  })
}

// 5、安装依赖
async function installDeps(pkgManager) {
  // 根据不同包管理器执行不同命令， 通过stream形式获取命令执行结果
  for await (const line of $`${pkgManager} install`) {
    if (line.includes('WARN')) {
      console.warn(line);
    } else {
      spinner.text = line
    }
  }
}

function startDev() {
  const { args } = program
  // console.log('args: ', args);
  return dev(args)
}

function startBuild() {
  const { args } = program
  return build(args)
}
