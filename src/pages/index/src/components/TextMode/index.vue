<template>
    <v-container fluid class="pt-0"  v-if="!showBuilder">
        <Controller>
            <TextModeController
                    :showTemplateList="showTemplateList"
                    :importFile="importFile"
                    :showPreviewInMobile="showPreviewInMobile"
                    :showExport="selectedTemplate!=null"
            />
        </Controller>
        <v-row>
            <v-col cols="12" lg="6">
                <FillYourData v-model="personalInfo" />
            </v-col>
            <v-col v-if="+$mq>=1264"
                   cols="12"
                   lg="6"
                   class="px-6 py-8"
                   style="position: fixed;top: 50px;right: 0;"
                   ref="text-mode-preview"
                   :style="'height:'+previewCardH+'px'"
            >
                <v-hover v-slot="{hover}">
                    <PreviewPage :pageData="pageData"
                                 id="preview-export"
                                 :style="`left:50%;border:1px solid var(--text-muted);transform:scale(${previewScale}) translateX(-50%);`" >
                        <v-overlay
                                absolute
                                :value="hover"
                        >
                            <div v-if="selectedTemplate" class="d-flex flex-column">
                                <v-btn class="mt-2" @click="goToBuilder" style="background:#fff;" x-large color="info">
                                    <v-icon class="mr-2">fas fa-code</v-icon>
                                    Builder
                                </v-btn>
                            </div>
                            <v-btn v-else x-large class="mr-2" color="success" small @click="showTemplateList">Choose a template</v-btn>
                        </v-overlay>
                    </PreviewPage>
                </v-hover>
            </v-col>
            <modal
                    v-else
                    :name="mobilePreviewUid"
                    :ref="mobilePreviewUid"
                    width="100%"
                    :max-width="450"
                    :adaptive="true"
                    height="auto"
                    :scrollable="true"
            >
                <div ref="text-mode-preview" class="px-6 py-8" :style="'height:'+previewCardH+'px'">
                    <PreviewPage :pageData="pageData"
                                 id="preview-export"
                                 :style="`left:50%;border:1px solid var(--text-muted);transform:scale(${previewScale}) translateX(-50%);`" >
                    </PreviewPage>
                    <v-btn
                            v-if="this.selectedTemplate==null"
                            @click="showTemplateListInMobile"
                            :style="{
                                position: 'absolute',
                                zIndex: '500',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                }"
                    >
                        Choose a template
                    </v-btn>
                </div>
                <div class="text-center py-2" v-if="this.selectedTemplate!=null">
                    <Export />
                </div>
            </modal>
        </v-row>

        <NavigationDrawer
                fixed
                top
                right
                :style="`height:100vh;max-width:300px;min-width:280px;`"
                :drawerShow="templateListShowing"
                @input="updateDrawer"
        >
            <ChooseTemplate :template-list="templateList"
                            :personal-info="personalInfo"
                            :importFile="importFile"
                            :updateSelectTemplate="updateSelectTemplate"/>
        </NavigationDrawer>
        <input
                type="file"
                v-show="false"
                ref="import_file"
                @change="insertFile"
        />
    </v-container>
</template>

<script>
    import {v4 as uuidv4} from "uuid"
    import FillYourData from "./FillYourData/index"
    import PreviewPage from "../BuilderMode/PreviewPage/index"
    import {getFromCache, setCache} from "../../utils/cacheControl"
    import {PERSONAL_INFO} from "../../utils/CONSTANT"
    import templateFillWithData from '../../utils/templateFillWithData'
    import personalInfoEmpty from '../../utils/personalInfoEmpty'
    import deepClone from 'clone-deep'
    import BuilderMode from "../BuilderMode/index"
    import NavigationDrawer from "../commons/NavigationDrawer"
    import ChooseTemplate from "./ChooseTemplate/index"
    import * as templates from './templates'
    import Navigation from "../Navigation"
    import TextModeController from "./TextModeController"
    import Controller from "../Controller"
    import Export from "../Export"
    import calcPreviewSizeScale from "../../utils/calcPreviewSizeScale"
    export default {
        name: "TextMode",
        components: {
            Export,
            Controller,
            TextModeController,
            Navigation, ChooseTemplate, NavigationDrawer, BuilderMode, PreviewPage, FillYourData
        },
        mounted(){
            // console.log(pageConfig)
            getFromCache(this.personalCookieKey).then((data)=>{
                if(data)this.personalInfo=data
            })
            this.calcPreviewSize()
            $(window).on('resize',this.calcPreviewSize)
        },
        destroyed() {
            $(window).off('resize',this.calcPreviewSize)
        },
        data(){
            return {
                templateListShowing:false,
                showBuilder:false,
                personalCookieKey:PERSONAL_INFO,
                personalInfo:deepClone(personalInfoEmpty),
                pageData:[],
                templateList:Object.values(templates),
                selectedTemplate:null,
                previewScale:0.5,
                previewCardH:300,
                mobilePreviewUid:uuidv4(),
            }
        },
        watch:{
            personalInfo:{
                deep:true,
                handler(newV){
                    setCache(this.personalCookieKey,newV)
                    if(this.selectedTemplate)this.pageData=templateFillWithData(this.selectedTemplate,this.personalInfo)
                }
            }
        },
        methods:{
            goToBuilder(){
                console.log('builder')
                this.$router.push({ name: 'builder', params: { pageDataStr:JSON.stringify(this.pageData),type:'template' } })
                // this.showBuilder=true
            },
            updateDrawer(val){
                if(val===this.templateListShowing)return
                if(val)this.showTemplateList()
                else this.hideTemplateList()
            },
            showTemplateList(){
                this.templateListShowing=true
            },
            hideTemplateList(){
                this.templateListShowing=false
            },
            showPreviewInMobile(){
                this.$modal.show(this.mobilePreviewUid)
                setTimeout(()=>{
                    this.calcPreviewSize()
                },200)
            },
            showTemplateListInMobile(){
                this.$modal.hide(this.mobilePreviewUid)
                setTimeout(()=>{
                    this.showTemplateList()
                },100)
            },
            calcPreviewSize(){
                let navH=$('#nav-header').outerHeight()
                let {
                    previewCardH,previewScale
                }=calcPreviewSizeScale(this.$refs['text-mode-preview'],{
                    width:'auto',
                    height:window.innerHeight-navH -64
                })
                // console.log($('#nav-header'),window.innerHeight,this.$refs['text-mode-preview'],previewScale)
                this.previewCardH=previewCardH
                this.previewScale=previewScale
                if(+this.$mq<1260)this.previewCardH+=64
            },
            updateSelectTemplate(template){
                this.selectedTemplate=template
                this.pageData=templateFillWithData(template,this.personalInfo)
                this.hideTemplateList()
            },
            importFile(){
                this.$refs.import_file.click()
            },
            insertFile(){
                this.insertImport(this.$refs.import_file.files[0])
            },
            insertImport(File){
                File.text().then((data)=>{
                    let importData=deepClone(JSON.parse(data))
                    if(importData.version!==pageConfig.version)return
                    this.templateList.push(importData)
                    this.updateSelectTemplate(importData)
                })
            },
        }
    }
</script>

<style scoped>

</style>
