const fs = require('fs')
const ts = ['/src/main.ts', '/src/vuex', '/src/router/index.ts', '/src/model', '/src/shims-vue.d.ts']
const js = ['/src/main.js', '/src/vueStore', '/src/router/index.js']
  // 删除指定路径的目录
const removeFolder = async(path) => {
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        fs.rmdirSync(path);
      } else {
        fs.unlinkSync(curPath, function(err) {
          if (err) throw err;
        });
      }
    });
  }
};
// 删除指定路径的文件或文件夹
const removeFileORFolder = async(path) => {
  return new Promise(resolve => {
    if (path.substr(1).includes('.')) {
      fs.unlinkSync(path)
    } else {
      removeFolder(path)
    }
    resolve()
  })
};

const readFile = async(path) => {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      if (err) throw err;
      resolve(data.toString())
    })
  })
}
const writeFile = async(path, content) => {
  return new Promise(resolve => {
    const _data = new Uint8Array(Buffer.from(content));
    fs.writeFile(path, _data, () => {
      resolve()
    })
  })
}
module.exports.ts = async(config) => {
  let name = config.name
  const ora = require('ora')
  const process = ora(` 生成工程`)
  process.start()
  if (config.type == 'Mobile'){
    if (!config.ts) {
      let fileString = await readFile(`./${name}/build/webpack.base.conf.js`)
      fileString = fileString.split('main.ts').join('main.js')
        // console.log(fileString);
      await writeFile(`./${name}/build/webpack.base.conf.js`, fileString)

      await ts.forEach(async(o, i) => {
        removeFileORFolder(`./${name}${o}`)
      })
    } else {
      await js.forEach((o, i) => {
        removeFileORFolder(`./${name}${o}`)
      })
    }
  }
  process.succeed()
}