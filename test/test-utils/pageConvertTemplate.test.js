import pageDataToTemplate from "../../src/pages/index/src/utils/data/pageData-to-template"

function allValueIsEmpty(pageData){
    for(let i=0;i<pageData.length;i++){
        if(pageData[i].config.value!=='')return false
        if(pageData[i].children){
            if(!allValueIsEmpty(pageData[i].children))return false
        }
    }
    return true
}

describe('Test page convert template and reverse', () => {


    it('convert to template should not have value',()=>{
        let pageData=[{config:{value:'Not show'},template_slug:'description'},]
        expect(allValueIsEmpty(pageDataToTemplate(pageData))).toBe(true)
    })

    it('Should accept period or startAt / endAt',()=>{
        let pageData=[
            {name:'sheet',template_slug:'employments',config:{value:''},children:[
                {config:{value:'2020-12-1 - 2022-12-22'},template_slug:'period'},
                {config:{value:'2020-12-1'},template_slug:'startAt'},
                {config:{value:'2022-12-22'},template_slug:'endAt'}
            ]},]
        expect(allValueIsEmpty(pageDataToTemplate(pageData))).toBe(true)
    })

    it('Should accept progress or label / value',()=>{
        let pageData=[
            {name:'sheet',template_slug:'skills',config:{value:''},children:[
                    {config:{label:'JS',value:'77'},template_slug:'progress'},
                    {config:{value:'JS'},template_slug:'label'},
                    {config:{value:'77'},template_slug:'value'}
                ]},]
        expect(allValueIsEmpty(pageDataToTemplate(pageData))).toBe(true)
    })
})
