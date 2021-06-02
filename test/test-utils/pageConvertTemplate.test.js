import pageConvertTemplate from "../../src/pages/index/src/utils/pageConvertTemplate"
import templateFillWithData from "../../src/pages/index/src/utils/templateFillWithData"
import {pageData, personInfo, templateData} from '../mock-data'

function replaceIdInTest(obj){
    return JSON.parse(JSON.stringify(obj).replace(/"id"\s?:\s?"(.*?)"/g,`"id":"test-id"`))
}

describe('Test page convert template and reverse', () => {


    it('page convert to template',()=>{
        expect(replaceIdInTest(pageConvertTemplate(pageData))).toEqual(templateData.template)
    })

    it('personalData and template convert to page',()=>{
        expect(replaceIdInTest(templateFillWithData(templateData,personInfo))).toEqual(pageData)
    })
})