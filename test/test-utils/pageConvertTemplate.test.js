import pageDataToTemplate from "../../src/pages/index/src/utils/data/pageData-to-template"
import templateToPageData from "../../src/pages/index/src/utils/data/template-to-pagedata"
import {pageData, personInfo, templateData} from '../mock-data'

function replaceIdInTest(obj){
    return JSON.parse(JSON.stringify(obj).replace(/"id"\s?:\s?"(.*?)"/g,`"id":"test-id"`))
}

describe('Test page convert template and reverse', () => {


    it('page convert to template',()=>{
        expect(replaceIdInTest(pageDataToTemplate(pageData))).toEqual(templateData.template)
    })

    it('personalData and template convert to page',()=>{
        expect(replaceIdInTest(templateToPageData(templateData,personInfo))).toEqual(pageData)
    })
})
