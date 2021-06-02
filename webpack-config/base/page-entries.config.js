
const glob = require('glob')
const dirVars = require('./dir-vars.config.js')
const { notTransPrefix, deepFolderPrefix,notPagePrefix} = require('../config')
const options = {
  cwd: dirVars.pagesDir,
}
const transFlat = glob.sync(`!(${notTransPrefix}|${deepFolderPrefix}|${notPagePrefix})*`, options)
const deepFolders1 = glob.sync(`${deepFolderPrefix}*/!(${deepFolderPrefix}|${notPagePrefix})*`, options)
const deepFolders2 =glob.sync(`${deepFolderPrefix}*/${deepFolderPrefix}*/[^${notPagePrefix}]*`,options)
const notTransFlat = glob.sync(`${notTransPrefix}!(${deepFolderPrefix}|${notPagePrefix})*`, options)

let finalDeepFolders = deepFolders1.concat(deepFolders2)

function parseDeep(page,notTranslate=false) {
  if(!page)return null
  let pagePath=page
  if(page.startsWith(deepFolderPrefix)){
    pagePath=page.substring(deepFolderPrefix.length)
  }
  if(pagePath.startsWith(notTransPrefix)){
    pagePath=pagePath.substring(notTransPrefix.length)
    notTranslate=true
  }
  let idx = pagePath.indexOf('/')
  let curPath = ''
  let nxtPath = ''
  if (idx === -1) {
    curPath=pagePath
  } else {
    curPath = pagePath.substring(0, idx)
    nxtPath = pagePath.substring(idx + 1)
  }
  let nxtArr=parseDeep(nxtPath,notTranslate)
  if(nxtArr){
    if(notTranslate || nxtArr[0].length===0){
      return [[],[curPath].concat(nxtArr[0],nxtArr[1])]
    }
    return [[curPath].concat(nxtArr[0]),nxtArr[1]]
  }else{
    if(notTranslate){
      return [[],[curPath]]
    }
    return [[curPath],[]]
  }
}

let transFolder=[]
let notTransFolder=[]

for(let i=0;i < finalDeepFolders.length;i++){
  let res=parseDeep(finalDeepFolders[i])
  if(res[0].length>0){
    res[0].push(finalDeepFolders[i])
    transFolder.push(res[0])
  }
  if(res[1].length>0){
    res[1].push(finalDeepFolders[i])
    notTransFolder.push(res[1])
  }
}

module.exports = {
  transFlat: transFlat,
  notTransFlat: notTransFlat,
  transFolder: transFolder,
  notTransFolder:notTransFolder,
}

