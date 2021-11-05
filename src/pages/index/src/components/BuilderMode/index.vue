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
        <HighlightTutorial
                v-if="+$mq>=1260"
                pageId="build-mode"
                :steps="[
                   {
                       element:'.build-mode-build-wrapper',
                       position:'left',
                       scrollTo:0,
                       intro:'构建区域可以拖拽组件进来，在此区域的组件可以进行属性编辑'
                   },
                   {
                       element:'.build-mode-tools-wrapper',
                       intro:'可使用的组件区域，目前提供了7种',
                   },
                   {
                       element:'.build-mode-custom-wrapper',
                       intro:'将组件组合保存为一个模块，会在这里显示，通过拖拽直接调用，此处预先配置了教育、工作和项目模块',
                   },
                   {
                       element:'.build-mode-preview',
                       intro:'预览区，实时显示，所见即所得',
                   },
                   {
                       element:'.tutorial-font-select',
                       intro:'选择字体，目前提供了3种中文字体，3种英文字体',
                   },
                   {
                       element:'.tutorial-build-mode-autosave',
                       intro:'开启自动保存，勾选情况下，每一次构建变更都会自动保存为一个名为autosave的存档',
                   },
                   {
                       element:'.tutorial-build-mode-quick-edit',
                       intro:'开启快速编辑，勾选情况下，可以快速编辑内容',
                   },
                   {
                       element:'.tutorial-build-mode-save-in-cache',
                       intro:'将当前构建手动命名保存，重名会提示覆盖',
                   },
                   {
                       element:'.tutorial-build-mode-cache',
                       intro:'查看本地所有的保存记录',
                   },
                   {
                       element:'.tutorial-build-mode-import',
                       intro:'通过JSON文件导入构建',
                   },
                   {
                       element:'.tutorial-build-mode-export',
                       intro:'导出为PDF, IMAGE或者JSON',
                   },
                ]"
        />
        <div class="page-wrapper h-100">
            <h2>构建区</h2>
            <div id="page" class="build-mode-build-wrapper">
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
            <h2>构建工具</h2>
            <DIYTools class="build-mode-tools-wrapper" :group="group" :componentList="toolList" />
            <CustomTemplate class="build-mode-custom-wrapper" :group="group" :componentList="customTemplate" :removeCustomTemplate="removeCustomTemplate"/>
        </PerfectScrollbar>
        <div class="preview-wrapper">
            <h2>预览</h2>
            <PreviewPage id="preview-export" class="build-mode-preview" :pageData="pageData" :scale="previewScale" />
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
                <p>当前组件内部还有子组件，确定一并删除吗？</p>
                <v-card-actions>
                    <v-btn small @click="hideConfirmModal">取消</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small color="error" @click="closeModalAndConfirm">删除</v-btn>
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
    import pageDataToTemplate from "../../utils/data/pageData-to-template"
    import { saveAs } from 'file-saver';
    import * as defaultCustomBuilder from './CustomTemplate/useful-builder'
    import HighlightTutorial from "../commons/HighlightTutorial"
    import commonStyleConfig from "../../utils/data/commonStyleConfig"
    import convertToValidPageData from "../../utils/data/convertToValidPageData"
    // import convertToValidPageData from "../../utils/data/convertToValidPageData"
    export default {
        name: "BuilderMode",
        components: {
            HighlightTutorial,
            Controller, BuilderController, CustomTemplate, PreviewPage, ResumeCache, DIYTools, DIYRender},
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
                            ...commonStyleConfig,
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
                            ...commonStyleConfig,
                            height:'auto',
                            col:12,
                        },
                        config:{
                            value:'This is paragraph',
                            icon:false,
                            appendIcon:null,
                            prependIcon:null,
                            textarea:false,
                        },
                        pin:false
                    },
                    {
                        id:uuidv4(),
                        name:'list',
                        styleConfig:{
                            ...commonStyleConfig,
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
                            ...commonStyleConfig,
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
                            ...commonStyleConfig,
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
                            ...commonStyleConfig,
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
                            ...commonStyleConfig,
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
                this.pageData = convertToValidPageData(JSON.parse(pageStr))
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
                this.pageData=convertToValidPageData(clonedDataList)
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
                    template:pageDataToTemplate(this.pageData),
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
