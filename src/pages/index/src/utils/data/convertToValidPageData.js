import commonStyleConfig from "./commonStyleConfig"
import deepClone from 'clone-deep'

export default function convertToValidPageData(dataList){
    for(let i=0;i<dataList.length;i++){
        let obj=dataList[i]

        if(obj.children){
            obj.children=convertToValidPageData(obj.children)
        }
        obj=resovleData(obj)
    }
    return deepClone(dataList)
}

function resovleData(obj){
    if(obj.styleConfig){
        // console.log(JSON.stringify(obj.styleConfig))
        obj.styleConfig=Object.assign({},commonStyleConfig,obj.styleConfig)
        // console.log(JSON.stringify(obj.styleConfig))
    }
    return obj
}
