<template>
    <section v-if="+$mq>=1260">
        <Controller>
            <BuilderController
                    :textMode="textMode"
                    :autoSave="autoSave"
                    :onChangeAutoSave="(val)=>autoSave=val"
                    :toggleTextMode="toggleTextMode"
                    :insertImport="insertImport"
                    :showCacheList="showCookieModal"
                    :showSaveModal="showSaveModal"
                    :saveAsJSON="saveAsJSON"
                    :saveAsTemplateJSON="saveAsTemplateJSON"
            />
        </Controller>
        <div class="page-wrapper h-100">
            <h2>Resume Builder</h2>
            <div id="page">
                <DIYRender :removeElement="removeElement"
                           :updatePageList="updatePageList"
                           :group="group"
                           :textMode="textMode"
                           :componentList="pageData"
                           :saveAsCustomTemplate="saveAsCustomTemplate"
                />
            </div>
        </div>
        <PerfectScrollbar class="tools-wrapper" :options="{wheelPropagation:false}">
            <h2>Builder unit</h2>
            <DIYTools :group="group" :componentList="toolList" />
            <CustomTemplate :group="group" :componentList="customTemplate" :removeCustomTemplate="removeCustomTemplate"/>
        </PerfectScrollbar>
        <div class="preview-wrapper">
            <h2>Preview</h2>
            <PreviewPage id="preview-export" :pageData="pageData" :scale="previewScale" />
        </div>
        <ResumeCache :showAtMounted="type==='builder'"
                     :pageData="pageData"
                     :update-page-list="updatePageList"
                     ref="resumeCacheRef" />
        <modal
                name="confirm-remove-modal"
                ref="confirm-remove-modal"
                :clickToClose="false"
                width="280"
                :adaptive="true"
                height="auto"
                :scrollable="true"
        >
            <v-card flat class="pa-4">
                <p>There are still some children element inside the page, are you sure to remove?</p>
                <v-card-actions>
                    <v-btn small @click="hideConfirmModal">No</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small color="error" @click="closeModalAndConfirm">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </modal>
    </section>
</template>

<script>
    import deepClone from 'clone-deep'
    import DIYRender from "./DIYRender"
    import DIYTools from "./DIYTools"
    import { v4 as uuidv4 } from 'uuid'
    import ResumeCache from "./ResumeCache"
    import PreviewPage from "./PreviewPage/index"
    import CustomTemplate from "./CustomTemplate/index"
    import BuilderController from "./BuilderController"
    import Controller from "../Controller"
    import pageConvertTemplate from "../../utils/pageConvertTemplate"
    import { saveAs } from 'file-saver';
    import * as defaultCustomBuilder from './CustomTemplate/useful-builder'

    let defaultGapConfig={
        margin:[0,0,0,0],
        padding:[0,0,0,0],
        borderTopWidth:0,
        borderRightWidth:0,
        borderBottomWidth:0,
        borderLeftWidth:0,
        borderColor:'#888',
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
        borderBottomLeftRadius:4,
        borderStyle:'solid',
        position:'static',
        top:'auto',
        left:'auto',
        right:'auto',
        bottom:'auto',
        lineHeight:'inherit',
        letterSpacing:'inherit',
        textAlign:'inherit',
        color:'inherit',
        fontSize:'inherit',
        background:'inherit',
        fontWeight: 'inherit',
        fontStyle:'inherit',
        colorInherit:true,
        fontSizeInherit:true,
        backgroundInherit:true,
        lineHeightInherit:true,
        letterSpacingInherit:true,
        textAlignInherit:true,
        fontWeightInherit: true,
        fontStyleInherit:true,
        transform:null
    }
    export default {
        name: "BuilderMode",
        components: {Controller, BuilderController, CustomTemplate, PreviewPage, ResumeCache, DIYTools, DIYRender},
        data(){
            return {
                group:'diy-resume',
                pageData:[],
                toolList:[
                    {
                        id:uuidv4(),
                        name:'sheet',
                        droppable:true,
                        children:[],
                        styleConfig:{
                            ...defaultGapConfig,
                            height:'auto',
                            col:12,

                        },
                        config:{},
                        pin:false
                    },
                    {
                        id:uuidv4(),
                        name:'paragraph',
                        styleConfig:{
                            ...defaultGapConfig,
                            height:'auto',
                            col:12,
                        },
                        config:{
                            value:'This is paragraph',
                            icon:false,
                            appendIcon:null,
                            prependIcon:null,
                        },
                        pin:false
                    },
                    {
                        id:uuidv4(),
                        name:'list',
                        styleConfig:{
                            ...defaultGapConfig,
                            height:'auto',
                            padding:[0,0,0,36],
                            col:12,
                        }
                        ,
                        config:{
                            value:['List example 1', 'List example 2'],
                            // order:false,
                            listStyle:'disc',
                            dense:false,
                        },
                        pin:false
                    },
                    {
                        id:uuidv4(),
                        name:'anchor',
                        styleConfig:{
                            ...defaultGapConfig,
                            height:'auto',
                            col:12,
                        },
                        config:{
                            value:'This is anchor example',
                            href:'',
                            textDecoration:'none',
                            icon:false,
                            appendIcon:null,
                            prependIcon:null,
                        },
                        pin:false
                    },
                    {
                        id:uuidv4(),
                        name:'progress',
                        styleConfig:{
                            ...defaultGapConfig,
                            height:'auto',
                            col:12,
                        },
                        config:{
                            label:'Javascript',
                            value:60,
                            total:100,
                            rounded:true,
                            height:8,
                            valueColor:'#2196F3',
                            backgroundColor:'#ccc',
                            style:'linear',
                            eachSegmentValue:20,
                        },
                        pin:false
                    },
                    {
                        id:uuidv4(),
                        name:'tag',
                        styleConfig:{
                            ...defaultGapConfig,
                            height:'auto',
                            padding:[8,6,8,6],
                            textAlign:'center',
                            textAlignInherit:false,
                            borderTopWidth:1,
                            borderRightWidth:1,
                            borderBottomWidth:1,
                            borderLeftWidth:1,
                            borderColor:'#888',
                            borderTopLeftRadius:4,
                            borderTopRightRadius:4,
                            borderBottomRightRadius:4,
                            borderBottomLeftRadius:4,
                            borderStyle:'solid',
                            col:12,
                        },
                        config:{
                            value:'Tags',
                        },
                        pin:false
                    },
                    {
                        id:uuidv4(),
                        name:'image',
                        styleConfig:{
                            ...defaultGapConfig,
                            height:'auto',
                            col:'auto',
                        },
                        config:{
                            value:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQUFBAYFBQUHBgYHCQ8KCQgICRMNDgsPFhMXFxYTFRUYGyMeGBohGhUVHikfISQlJygnGB0rLismLiMmJyb/wgALCAB4AHgBAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAQFBgMBAgf/2gAIAQEAAAAA/ewAAHGG7ywDymrRPtJIEPPgmaACspgfepArKYHurAh58EnRgVVQCRpAIudBY3YCkrg0/UBGzgm34B85UWV0A8rqUd7/ALB5AquAEuxn+8aGOAHe8//EAC8QAAEDAgQFAQcFAAAAAAAAAAECAwQFEQASIDAhIjFBUSMQEzJSYXGhM0BCYnL/2gAIAQEAAT8A/aPSWGR6jgB8d8KqzAPBtZwKsx3bWMM1CK6QA5lPhXDbnVFalFtg5UjqvucEkm5NzoZqbzTSWwhKsotc4gykymiq2VSeChsVR0tQ126q5ddKdLcxI7L5TsVw+g2PKtcc5X21eFDYrg9Bs/21o+NP3GxVfdGIpLigknin7jXTmS9KQOyTmOxXU8jSvBI104EzWredipNe9huDunmGuhozSFr+VOzWWMjqXEgBChbh50gEkAdTiO0GmUoAAIAvsz2Q9FcT3AuNNIbDkwE9EDNtOEJbUT0A00L9Z3/I2SQMVGc0GVstKzrULEjoNMKQYz4ctcdCPphiQy+LtrB+nfUSALkgAYk1Nlu6WvUV+MSJT759RfD5RwGsEg3BthioSWv55x4ViNU2XODo90r8YBBFwbj2SpDcZvOs/YecSpbsk85sjskdNyNKejn018vynpiFLRKbJAyqT8Scf//Z',
                            width:64,
                            height:64,
                        },
                        pin:false
                    },
                ],
                customTemplate:Object.values(defaultCustomBuilder),
                customPage:[],
                curRemoveList:null,
                curRemoveIndex:null,
                autoSave:true,
                nextTimeSaveInCache:true,
                previewScale:0.3,
                textMode:false,
                type:'builder',
                allReady:false,
            }
        },
        created(){
            /* get params */
            let pageStr = this.$route.params.pageDataStr
            let type = this.$route.params.type
            if(type){
                this.type=type
            }
            if (pageStr) {
                this.pageData = JSON.parse(pageStr)
            }
        },
        mounted(){
            if(document.getElementById('taskInfoModalWrap')){
                document.getElementById('taskInfoModalWrap').appendChild(this.$refs['confirm-remove-modal'].$el)
            }
            let winW=$(window).width()
            let pageW=$('#page').outerWidth()
            let offset=16
            this.previewScale=((winW-pageW -$('.tools-wrapper').outerWidth()) - offset*4) / pageW
        },
        watch:{
            pageData:{
                deep:true,
                handler(newV){
                    // console.log('deep',newV)
                    if(this.autoSave && this.nextTimeSaveInCache)this.$refs['resumeCacheRef'].saveInCache(newV)
                    if(!this.nextTimeSaveInCache){
                        this.nextTimeSaveInCache=true
                    }
                }
            }
        },
        methods:{
            updatePageList(clonedDataList,saveInCache=true){
                // Noted: nextTimeSaveInCache use when load from cache, should be false
                this.nextTimeSaveInCache=saveInCache
                this.pageData=clonedDataList
            },
            removeElement(indexList){
                let finalList=this.pageData
                for(let i=0;i<indexList.length;i++){
                    if(i===indexList.length-1){
                        break
                    }else{
                        if(!finalList[indexList[i]].children){
                            throw new Error('Something should not happen, check the logic')
                        }
                        finalList=finalList[indexList[i]].children
                    }
                }
                let finalObj=finalList[indexList[indexList.length-1]]
                this.curRemoveList=finalList
                this.curRemoveIndex=indexList[indexList.length-1]
                if(finalObj.children && finalObj.children.length>0){
                    // console.log('has children')
                    this.showConfirmModal()
                }else{
                    this.confirmRemove()
                }

            },
            showConfirmModal(){
                this.$modal.show('confirm-remove-modal')
            },
            hideConfirmModal(){
                this.$modal.hide('confirm-remove-modal')
            },
            closeModalAndConfirm(){
                this.hideConfirmModal()
                this.confirmRemove()
            },
            confirmRemove(){
                this.curRemoveList.splice(this.curRemoveIndex,1)
                this.updatePageList(this.pageData)
                this.curRemoveList=null
                this.curRemoveIndex=null
            },
            showCookieModal(){
                this.$refs['resumeCacheRef'].loadAndShowCookieList()
            },
            showSaveModal(){
                this.$refs['resumeCacheRef'].showSaveNowModal()
            },
            saveAsCustomTemplate(data){
                let newData=deepClone(data)
                this.recursiveChangeID(newData)
                this.customTemplate.push(newData)
            },
            removeCustomTemplate(index){
                this.customTemplate.splice(index,1)
            },
            recursiveChangeID(data){
                data.id=uuidv4()
                if(data.children){
                    for(let i=0;i<data.children.length;i++){
                        this.recursiveChangeID(data.children[i])
                    }
                }
            },
            toggleTextMode(){
                this.textMode=!this.textMode
            },
            insertImport(File){
                File.text().then((data)=>{
                    let json=JSON.parse(data)
                    this.pageData=deepClone(json.data)
                })
            },
            saveAsJSON(){
                let jsonFile={
                    data:this.pageData,
                    time:new Date().getTime(),
                    version:pageConfig.version
                }
                let jsonFileStr = JSON.stringify(jsonFile);
                let createdFileName = 'my-resume-diy.json'


                let file = new File([jsonFileStr], createdFileName, { type: 'application/json;charset=utf-8' });
                saveAs(file);
            },
            saveAsTemplateJSON(){
                let jsonFile={
                    template:pageConvertTemplate(this.pageData),
                    time:new Date().getTime(),
                    version:pageConfig.version
                }
                let jsonFileStr = JSON.stringify(jsonFile);
                let createdFileName = 'my-resume-diy-template.json'


                let file = new File([jsonFileStr], createdFileName, { type: 'application/json;charset=utf-8' });
                saveAs(file);
            }

        }
    }
</script>

<style scoped>
</style>
