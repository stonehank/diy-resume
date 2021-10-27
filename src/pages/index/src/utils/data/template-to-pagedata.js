import deepClone from 'clone-deep'
import {v4 as uuidv4} from "uuid"

export default function templateFillWithData(templateData,personalInfo){
    if(templateData.version!==pageConfig.version)return
    let cloneData=deepClone(templateData.template)
    return resolveFillData(cloneData,personalInfo,{})
}

/**
 *
 * @param templateList 模板数据<Array>，只处理一层
 * @param personalInfo 数据<Object>，只处理一层，嵌套数据递归处理
 * @param alreadyInsert
 */
function resolveFillData(templateList,personalInfo,alreadyInsert={}){
    const {
        arrayKeyList
    }=resolveKeyList(personalInfo)
    for(let i=0;i<templateList.length;i++){
        let dataObj=templateList[i]
        if(dataObj.name==='sheet' && dataObj.template_slug && arrayKeyList.includes(dataObj.template_slug)){
            // 添加页面模板循环
            let key=dataObj.template_slug
            if(personalInfo[key].length===0)continue
            if(!alreadyInsert[dataObj.template_slug]){
                alreadyInsert[dataObj.template_slug]=true
                for(let j=0;j<personalInfo[key].length;j++){
                    let newModalSheet=deepClone(dataObj)
                    newModalSheet.id=uuidv4()
                    newModalSheet.index=j
                    if(j===0){
                        templateList[i]=newModalSheet
                        dataObj=templateList[i]
                    }else{
                        templateList.splice(j+i,0,newModalSheet)
                    }
                }
            }
            // if(dataObj.template_slug==='employments')debugger
            dataObj.children=resolveFillData(dataObj.children,personalInfo[key][dataObj.index],alreadyInsert)
        }else if(dataObj.name==='sheet'){
            // 普通页面模板，直接进入
            dataObj.children=resolveFillData(dataObj.children,personalInfo,alreadyInsert)
        }else if(dataObj.template_slug
            // 在employments内部，description是数组，但是可以直接赋值
            // && normalKeyList.includes(dataObj.template_slug)
        ){
            if(dataObj.template_slug==='period'){
                dataObj.config.value=resolveDate(personalInfo.startAt,personalInfo.endAt)
            }else if(dataObj.template_slug==='link'){
                dataObj.config.value=personalInfo[dataObj.template_slug].value
                dataObj.config.href=personalInfo[dataObj.template_slug].href
            }else if(dataObj.template_slug==='email'){
                dataObj.config.value=personalInfo[dataObj.template_slug]
                if(dataObj.name==='anchor'){
                    dataObj.config.href='mailto:'+personalInfo[dataObj.template_slug]
                }
            }else if(dataObj.template_slug==='progress'){
                dataObj.config.label=personalInfo.label
                dataObj.config.value=personalInfo.value
            }else{
                dataObj.config.value=personalInfo[dataObj.template_slug]
            }

        }
    }
    return templateList
}


function resolveDate(startAt,endAt){
    if(startAt && endAt){
        return startAt + ' - ' + endAt
    }else if(startAt){
        return 'Start from '+startAt
    }else if(endAt){
        return 'Ends at '+endAt
    }else{
        return ''
    }
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
