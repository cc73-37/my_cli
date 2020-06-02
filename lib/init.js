const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.red(content))
const { clone } = require('./download')
module.exports = async name => {
  // 打印欢迎画面
  clear()
  let module_name = 'cDevtools'
  const data = await figlet(Array.from(module_name).join(' '))
  log(data)
  log(`创建项目：` + name)
  await clone('github:cc73-37/my_cli', name)
}