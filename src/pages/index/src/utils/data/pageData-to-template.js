import deepClone from 'clone-deep'
import personalInfoDataEmpty from './personalInfoDataEmpty'


export default function pageDataToTemplate(pageData){
    // if(moduleData.version!==pageConfig.version)return
    let cloneData=deepClone(pageData)
    const {
        // normalKeyList,
        arrayKeyList
    }=resolveKeyList(personalInfoDataEmpty)
    return slimPageData(cloneData,arrayKeyList)

}

function slimPageData(pageData,arrayKeyList){
    let detectedSheetSlug={}
    for(let i=pageData.length-1;i>=0;i--){
        let curComponentData=pageData[i]
        if(curComponentData.name==='sheet'){
            // 是一个可增减数量的数据
            if(curComponentData.template_slug && arrayKeyList.includes(curComponentData.template_slug)){
                if(detectedSheetSlug[curComponentData.template_slug]){
                    pageData.splice(i,1)
                    continue
                }
                detectedSheetSlug[curComponentData.template_slug]=true
            }
            curComponentData.children=slimPageData(curComponentData.children,arrayKeyList)
        }else if(curComponentData.template_slug){
            switch(curComponentData.name){
                case 'list':
                    curComponentData.config.value=[]
                    break
                case 'anchor':
                    curComponentData.config.value=''
                    curComponentData.config.href=''
                    break
                case 'progress':
                    curComponentData.config.label=''
                    curComponentData.config.value=50
                    break
                default:
                    console.log(curComponentData.template_slug,curComponentData.config)
                    curComponentData.config.value=''
                    break
            }
        }
    }
    return pageData
}


function resolveKeyList(personalInfo){
    let normalKeyList=[]
    let arrayKeyList=[]
    for(let key in personalInfo){
        if(personalInfo.hasOwnProperty(key)){
            if(Array.isArray(personalInfo[key])){
                arrayKeyList.push(key)
            }else{
                normalKeyList.push(key)
            }
        }
    }
    return {
        normalKeyList,
        arrayKeyList
    }
}
