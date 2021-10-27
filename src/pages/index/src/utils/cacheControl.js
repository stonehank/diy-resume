import jsCookies from 'js-cookie'
import * as localForage from  "localforage"
let usingIdxDB=!!window.indexedDB

function getAllCache(){
    return new Promise(res=>{
        if(usingIdxDB){
            let allCacheObj={}
            return localForage.iterate(function(value, key, iterationNumber) {
                let parsedData=null
                try{
                    parsedData=JSON.parse(value)
                }catch(_){
                    if(typeof value==='string'){
                        parsedData=value
                    }else{
                        parsedData=null
                    }
                }
                allCacheObj[key]=parsedData
            }).then(function() {
                return res(allCacheObj)
            })
        }else{
            return res(__getAllCacheLightweight())
        }
    })
}

function __getAllCacheLightweight(){
    let allCacheObj={}
    if(localStorage){
        for(let key in localStorage){
            if(localStorage.hasOwnProperty(key)){
                allCacheObj[key]=getFromCache(key)
            }
        }
    }else{
        allCacheObj=jsCookies.get()
    }
    return allCacheObj
}

function removeCache(key){
    return new Promise(res=>{
        if(usingIdxDB){
            return localForage.removeItem(key).then(function() {
                return res(true)
            })
        }else{
            __removeCacheLightweight(key)
            return res(true)
        }
    })
}

function __removeCacheLightweight(key){
    if(localStorage){
        localStorage.removeItem(key)
    }else{
        jsCookies.remove(key)
    }
}

function getFromCache(key){
    return new Promise(res=>{
        if(usingIdxDB){
            let savedUserData=null
            return localForage.getItem(key).then(function(originalData) {
                // 当离线仓库中的值被载入时，此处代码运行
                try{
                    savedUserData=JSON.parse(originalData)
                }catch(_){
                    if(typeof originalData==='string'){
                        savedUserData=originalData
                    }else{
                        savedUserData=null
                    }
                }
                return res(savedUserData)
            })
        }else{
            return res(__getFromCacheLightweight(key))
        }

    })
}

function __getFromCacheLightweight(key){
  let savedUserData=null
  if(localStorage){
    let originalData=localStorage.getItem(key)
      try{
          savedUserData=JSON.parse(originalData)
      }catch(_){
          if(typeof originalData==='string'){
              savedUserData=originalData
          }else{
              savedUserData=null
          }
      }
  }else{
    savedUserData=jsCookies.get(key)
  }
  return savedUserData
}


function setCache(key,value,expires=7){
    return new Promise(res=>{
        if(usingIdxDB){
            let valueStr = JSON.stringify(value)
            return localForage.setItem(key, valueStr).then(()=>{
                res(null)
            })
        }else{
            __setCacheLightweight(key,value,expires)
            return res(null)
        }
    })
}

function __setCacheLightweight(key,value,expires=7){
  let valueStr = JSON.stringify(value)
  if (localStorage) {
    localStorage.setItem(key, valueStr)
  } else {
    jsCookies.set(
      key,
      value,
      {expires: expires})
  }
}


export {getFromCache,setCache,getAllCache,removeCache,__getFromCacheLightweight,__setCacheLightweight}
