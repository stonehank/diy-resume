const path = require('path')
const dirVars = require('./base/dir-vars.config.js')
const { transFlat, transFolder, notTransFlat, notTransFolder } = require('./base/page-entries.config.js')
const {  notTransPrefix } = require('./config')
const configEntry = {}


function resolveDeepEntry(pathArr){
  let folderName1=''
  let folderName2=''
  let pageName=''
  let fullPath=''
  // 最后一个是完整路径
  if(pathArr.length===3){
    [folderName1,pageName,fullPath]=pathArr
  }else{
    [folderName1,folderName2,pageName,fullPath]=pathArr
  }
  const abbName = folderName1 + '_' + (folderName2 ? (folderName2 + '_') : '') + pageName
  configEntry[abbName] = path.resolve(dirVars.pagesDir, fullPath + '/src/index.js')
}

transFlat.forEach((page) => {
  configEntry[page] = path.resolve(dirVars.pagesDir, page + '/src/index.js')
})
notTransFlat.forEach((page) => {
  const pageName = page.substring(notTransPrefix.length)
  configEntry[pageName] = path.resolve(dirVars.pagesDir, page + '/src/index.js')
})

transFolder.forEach((pathArr) => {
  resolveDeepEntry(pathArr)
})



notTransFolder.forEach((pathArr) => {
  resolveDeepEntry(pathArr)
})

module.exports = configEntry
