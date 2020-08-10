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
  var inquirer = require('inquirer');
  var option = [{
    type: 'input',
    name: 'name',
    message: '项目名称?',
    default: name
  }, {
    type: 'input',
    name: 'description',
    message: '项目描述?',
    default: 'a Vue2.0 Project'
  }, {
    type: 'list',
    name: 'type',
    message: '请选择工程类型?',
    choices: [
      "Mobile",
      "PC"
    ]
  }, {
    type: 'confirm',
    name: 'setup',
    message: '是否需要安装依赖(使用cnpm安装)?',
    default: false
  }]
  inquirer.prompt(option).then(async(res) => {
    log(`创建项目：` + res.name)
    if (res.type == 'Mobile') {
      await clone('github:cc73-37/vueMobileTemplate', res.name)
    } else if (res.type == 'PC') {
      await clone('github:PanJiaChen/vue-element-admin', res.name)
    }
    await edit(res.name, 'name', res.name)
    await edit(res.name, 'description', res.description)
    if (res.setup) {
      await setup(name)
    }
    log(chalk.green(`
      ===========================
      cd ${name}
      npm run dev
      ===========================
    `))
  });
}