const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')

const log = content => console.log(chalk.red(content))
const { clone } = require('./download')
const { edit } = require('./edit')
const { setup } = require('./setup')


module.exports = async name => {
  // 打印欢迎画面
  clear()
  const module_name = await figlet(Array.from('cDevtools').join(' '))
  log(module_name)
  log(`创建项目：` + name)
  await clone('github:cc73-37/vueMobileTemplate', name)
  await edit(name)
  await setup(name)
}