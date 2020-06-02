#!/usr/bin/env node
 // console.log('cli ..... kkb')
const program = require('commander')
program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init'))
  // .action(name => {
  //   console.log('init ' + name)
  // })
  // program
  //   .command('init <name>')
  //   .description('init project')
  //   .action(name => {
  //     console.log('init ' + name)
  //   })
program.parse(program.argv)