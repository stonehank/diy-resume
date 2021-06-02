const fs=require('fs-extra')
const path=require('path')

let pagesPath=path.resolve(__dirname,'../src/pages')
let pagesDir=fs.readdirSync(pagesPath)
let {primaryLang, otherLangList,createDefaultMeta,isoCode}=require('./config')
let {deepFolderPrefix,notTransPrefix,notPagePrefix,author}=require('../webpack-config/config')
let langList=[primaryLang]
langList=langList.concat(otherLangList)

function exec(rootDir,dir,folder1,folder2){
  for(let i=0;i<dir.length;i++){
    let filename=dir[i]
    let filePath=path.resolve(rootDir,filename)
    let langList=[primaryLang]
    if(filename.startsWith(notPagePrefix))continue
    if(filename.startsWith(notTransPrefix)){
      filename=filename.slice(notTransPrefix.length)
    }else{
      langList=langList.concat(otherLangList)
    }
    if(filename.startsWith(deepFolderPrefix)){
      filename=filename.slice(deepFolderPrefix.length)
      let newDir=fs.readdirSync(filePath)
      let newFolder1=null
      let newFolder2=null
      if(folder1==null){
        newFolder1=filename
      }else{
        newFolder1=folder1
        newFolder2=filename
      }
      exec(filePath,newDir,newFolder1,newFolder2)
    }else{
      for(let j=0;j<langList.length;j++){
        rewriteLocales(folder1,folder2,filename,langList[j])
      }
    }
  }
}
exec(pagesPath,pagesDir,null,null)
console.log('Locales filled!')
function rewriteLocales(folder1,folder2,pageName,language){
  let defaultMeta=createDefaultMeta(folder1,folder2,pageName,author)
  let languagePath=path.resolve(__dirname,language+'.js')
  let localesRoot=require(languagePath)
  let curPageLang=getCurPageLang(localesRoot.pages,folder1,folder2,pageName,defaultMeta)
  const metaConfig = curPageLang.meta
  metaConfig.lang = isoCode[language]
  fs.outputFileSync(languagePath,'module.exports='+JSON.stringify(localesRoot,null,2))
}



function getCurPageLang(langObj,folder1,folder2,page,defaultMeta){
  if(!folder1 && folder2 || !page){
    throw new Error('Error, Check plugins.config.js!! Possible error1 : Must have page. Possible error2: if have folder2 name, must have folder1(parent folder) name.')
  }
  if(folder1 && folder2 && page){
    return resolve(langObj,[folder1,folder2,page],0,defaultMeta)
  }else if(folder1 && page){
    return resolve(langObj,[folder1,page],0,defaultMeta)
  }else if(page){
    return resolve(langObj,[page],0,defaultMeta)
  }
}
function resolve(langObj,keyArr,idx,defaultMeta){
  if(idx===keyArr.length)return langObj
  if(langObj[keyArr[idx]]){
    return resolve(langObj[keyArr[idx]],keyArr,idx+1,defaultMeta)
  }else{
    if(idx===keyArr.length-1){
      langObj[keyArr[idx]]={meta:defaultMeta}
      return langObj[keyArr[idx]]
    }else{
      langObj[keyArr[idx]]={}
      return resolve(langObj[keyArr[idx]],keyArr,idx+1,defaultMeta)
    }
  }
}
