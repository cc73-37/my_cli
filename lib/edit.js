const fs = require('fs')
const chalk = require('chalk')

const readJson = async(name) => {
  return new Promise(resolve => {
    fs.readFile(`./${name}/package.json`, (err, data) => {
      if (err) throw err;
      resolve(data.toString())
    })
  })
}
const writeJson = async(name, data) => {
  return new Promise(resolve => {
    const _data = new Uint8Array(Buffer.from(data));
    fs.writeFile(`./${name}/package.json`, data, () => {
      resolve('项目名称已修改')
    })
  })
}
module.exports.edit = async(name) => {
  const ora = require('ora')
  const process = ora(`修改项目名称 ......`)
  process.start()
  let conf = await readJson(name)
  let new_conf = conf.split('vue_mobile').join(name)
  await writeJson(name, new_conf)
  process.succeed()
}