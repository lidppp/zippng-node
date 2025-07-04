const path = require("path")
const MultiSpinner = require("multispinner")
const fs = require("fs")
const {question} = require("readline-sync");
// 创建tinypng实例
const tinify = require("tinify")
let isDeep = false
// 获取当前路径下所有文件以及文件夹
const readDirList = (_path)=>{
  return new Promise((resolve,reject)=>{
    fs.readdir(_path,(err,files)=>{
      if(err){
        reject(err)
      }else{
        resolve(files.map(item=>{
          let stat = fs.statSync(path.join(_path,item))
          return {
            path: path.join(_path,item), // 路径
            isDirectory: stat.isDirectory(), // 获取是否为文件夹
            ext: path.extname(item).toLowerCase(), // 后缀名
            size: stat.size, // 文件大小
          }
        }))
      }
    })
  })
}
// 执行压缩程序
const run = (_path)=>{
  tinify.key = getKey()
  readDirList(_path).then(res=>{
    const spinnerTexts = {}
    const pngArr = res.filter(item=>item.ext === ".png")

    if (!pngArr.length){
      console.log("Can't find PNG file.")
      return
    }

    pngArr.forEach((item,index) => {
      spinnerTexts[index] = `[${item.path}] Original file size before compression: ${(item.size / 1024).toFixed(2)} KB`;
    });


    const spinner = new MultiSpinner(spinnerTexts, {
      interval: 100,
      indent: 2,
      symbol: {
        success: '✓', // 成功符号
        error: '✗'   // 错误符号
      }
    });

    spinner.on('done', () => {
      console.log("Compression count for this month: " + tinify.compressionCount + "\n");
    });

    pngArr.forEach((item, index)=>{
      if(item.isDirectory && isDeep){
        run(item.path)
        return
      }
      tinify.fromFile(item.path).toFile(item.path).then(res=>{
        spinner.spinners[index].text = `[${item.path}] Compressed file size: ${(item.size / 1024).toFixed(2)} KB -> ${(fs.statSync(item.path).size / 1024).toFixed(2)} KB`;
        spinner.success(index);
      }).catch(err=>{
        spinner.spinners[index].text = `[${item.path}] Compression failed. Please check your network or reset your TinyPNG API key using \`zippng -s key\`. Error details: [${err.message}]`;
        spinner.error(index);
      })
    })
  })
}

const setKey = (key)=>{
  const config_path = path.join(__dirname, "config.json")
  fs.writeFileSync(config_path, JSON.stringify({key:key}))
}

const inputKey = ()=>{
  return question('Please enter the API key obtained from TinyPNG, you can refer to https://tinify.com/developers for more details. \n')
}

const getKey = ()=>{
  const config_path = path.join(__dirname, "config.json")
  if (!fs.existsSync(config_path)){
    fs.writeFileSync(config_path, JSON.stringify({key:""}))
  }
  const config = JSON.parse(fs.readFileSync(config_path,"utf8"))
  if (config.key){
    return config.key
  } else {
    const userInput = inputKey();
    if (!userInput){
      console.log("Please enter the secret key")
      process.exit(1)
    }
    setKey(userInput)
    return userInput
  }

}


const main = ()=>{

  const args = process.argv.slice(2)

  if(args.includes("-r")){
    isDeep = true
  }

  if (args.includes("-v")){
    console.log(JSON.parse(fs.readFileSync(path.join(__dirname,"package.json"),"utf8")).version)
    return
  }

  if (args.includes("-s")){
    const index = args.indexOf("-s") + 1
    if (args[index]) {
      setKey(args[index])
    }else {
      console.log("Please enter the secret key")
    }
    return
  }

  if (args.includes("-h")){
    console.log(
`\nCompress PNG files in the current directory.\n
use: \`zippng [-r|-v|-h|-s YOUR_API_KEY]\`
-r\tRecursively search for PNG files
-v\tView version 
-h\tHelp documentation
-s\tSet TinyPNG API Key
\n`
    )
    return
  }



  run(process.cwd());
}

main()
