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
      resolve()
    })
  })
}
module.exports.edit = async(name) => {
  const ora = require('ora')
  const process = ora(`\t生成项目`)
  process.start()
  let conf = await readJson(name)
  let new_conf = conf.split('vue_mobile').join(name)
  await writeJson(name, new_conf)
  process.succeed()
}