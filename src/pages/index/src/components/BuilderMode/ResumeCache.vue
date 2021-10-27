<template>
    <div>
        <modal
                name="select-cookie-modal"
                ref="select-cookie-modal"
                :adaptive="true"
                height="auto"
                :scrollable="true"
        >
            <div class="pa-4">
                <p v-if="cacheList.length>0">We found you already have some caches, choose one to use</p>
                <p v-else>Not found any cache can use</p>
                <v-row dense v-if="cacheList.length>0">
                    <v-col
                            v-for="(cacheObj,index) in cacheList"
                            :key="index"
                            :cols="12"
                            :sm="6"
                    >
                        <v-card ref="preview-cache-list" class="d-flex" >
                            <div :style="`width:${previewCardW}px;height:${previewCardH}px;`">
                                <PreviewPage
                                        v-if="previewCardH!=null"
                                        style="transform-origin: top left;"
                                        :pageData="cacheObj.data"
                                        :scale="previewScale" />
                            </div>
                            <div>
                                <v-card-title v-text="cacheObj.name.slice(cacheCookieName.length)"></v-card-title>
                                <v-card-subtitle style="font-size:12px;" v-text="new Date(cacheObj.time).toLocaleString()"></v-card-subtitle>
                                <v-card-actions class="d-flex flex-column">
                                    <v-btn block x-large color="success" @click="()=>useSpecificCache(cacheObj.data)">
                                        use
                                    </v-btn>
                                    <v-btn absolute style="top:0;right:0;" icon color="error" small @click="()=>removeSpecificCache(cacheObj.name)">
                                        <v-icon small>fas fa-trash-alt</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </modal>
        <modal
                name="save-cookie-modal"
                ref="save-cookie-modal"
                :adaptive="true"
                height="auto"
                :scrollable="true"
        >
            <div class="pa-4">
                <p>Save your data now</p>
                <v-row dense>
                    <v-col
                            :cols="12"
                    >
                        <v-text-field v-on:keyup.enter="tryToSaveDataInCache"
                                      label="Give a name"
                                      v-model="suffixName"
                                      autofocus
                                      dense outlined hide-details
                        />
                    </v-col>
                </v-row>
                <div class="pa-2 d-flex">
                    <v-spacer></v-spacer>
                    <v-btn color="success" small @click="tryToSaveDataInCache">Save Now</v-btn>
                </div>
            </div>
            <div v-if="cacheList.length>0" class="pa-4">
                <p>We found you already have some caches, click to use the name</p>
                <v-row dense v-if="cacheList.length>0">
                    <v-col
                            v-for="(cacheObj,index) in cacheList"
                            :key="index"
                            :cols="12"
                            :sm="6"
                    >
                        <v-card ref="preview-cache-list" class="d-flex" @click="()=>saveAs(cacheObj.name)">
                            <div :style="`width:${previewCardW}px;height:${previewCardH}px;`">
                                <PreviewPage
                                        v-if="previewCardH!=null"
                                        style="transform-origin: top left;"
                                        :pageData="cacheObj.data"
                                        :scale="previewScale" />
                            </div>
                            <div>
                                <v-card-title v-text="cacheObj.name.slice(cacheCookieName.length)"></v-card-title>
                                <v-card-subtitle style="font-size:12px;" v-text="new Date(cacheObj.time).toLocaleString()"></v-card-subtitle>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </modal>
        <modal
                name="overwrite-cookie-confirm-modal"
                ref="overwrite-cookie-confirm-modal"
                :adaptive="true"
                height="auto"
                :scrollable="true"
        >
            <div class="pa-4">
                <p>We found a same name with {{suffixName}} cache, want to overwrite?</p>
                <div class="pa-2 d-flex">
                    <v-btn color="gray" small @click="hideConfirmOverwrite">No</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" small @click="confirmOverwrite">Yes, sure</v-btn>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import deepClone from 'clone-deep'
    import {getAllCache, getFromCache, removeCache, setCache} from "../../utils/cacheControl"
    import PreviewPage from "./PreviewPage/index"
    import calcPreviewSizeScale from "../../utils/calcPreviewSizeScale"
    import {BUILDER_CACHE_PREFIX} from '../../utils/CONSTANT'
    import convertToValidPageData from "../../utils/data/convertToValidPageData"
    export default {
        name: "ResumeCache",
        components: {PreviewPage},
        props:{
            showAtMounted:{
                type:Boolean,
                default:true,
            },
            pageData:Array,
            updatePageList:Function,
        },
        data(){
            return {
                suffixName:'',
                cacheList:[],
                cacheCookieName:BUILDER_CACHE_PREFIX,
                previewScale:0.2,
                previewCardH:null,
                previewCardW:null,
                previewScaleTimer:null,
            }
        },
        mounted(){
            if(this.showAtMounted){
                this.loadFromCookie().then(()=>{
                    if(this.cacheList.length>0){
                        this.showCookieModal()
                        // this.calcThePreviewScale()
                    }
                })
            }
        },
        destroyed() {
            clearTimeout(this.previewScaleTimer)
        },
        methods:{
            calcThePreviewScale(){
                if(!this.$refs['preview-cache-list'] || this.$refs['preview-cache-list'].length===0)return
                let {
                    previewCardH,previewScale,previewCardW
                }=calcPreviewSizeScale(this.$refs['preview-cache-list'][0].$el,{
                    width:$(this.$refs['preview-cache-list'][0].$el).outerWidth() * 0.5,
                    height:'auto'
                })
                this.previewCardH=previewCardH
                this.previewCardW=previewCardW
                this.previewScale=previewScale
            },
            loadAndShowCookieList(){
                this.loadFromCookie().then(()=>{
                    this.showCookieModal()
                })
            },
            showCookieModal(){
                // return this.loadFromCookie().then(()=>{
                //     console.log(this,this.$modal)
                this.$modal.show('select-cookie-modal')
                this.previewScaleTimer=setTimeout(()=>{
                    this.calcThePreviewScale()
                },200)
                // })
            },
            hideCookieModal(){
                this.$modal.hide('select-cookie-modal')
            },
            loadFromCookie(){
                return getAllCache().then((allCacheObj)=>{
                    this.cacheList=[]
                    // console.log(allCacheObj)
                    for(let key in allCacheObj){
                        if(key.startsWith(this.cacheCookieName)){
                            if(key===this.cacheCookieName+'autosave'){
                                this.cacheList.unshift(allCacheObj[key])
                            }else{
                                this.cacheList.push(allCacheObj[key])
                            }
                        }
                    }
                    this.cacheList=this.cacheList.filter(Boolean)
                })

            },
            saveInCache(data,suffixName='autosave'){
                let time=new Date().getTime()
                let fullName=this.cacheCookieName+suffixName
                // console.log('save',fullName,data)
                // console.log(fullName,data)
                let saveObj={time, data, name:fullName}
                setCache(fullName,saveObj,30)
            },
            useSpecificCache(data){
                // console.log(deepClone(data))
                this.updatePageList(deepClone(data),false)
                this.hideCookieModal()
            },
            removeSpecificCache(name){
                removeCache(name).then(()=>{
                    this.loadFromCookie()
                })

                // this.hideCookieModal()
            },

            showSaveNowModal(){
                this.$modal.show('save-cookie-modal')
            },

            hideSaveNowModal(){
                this.$modal.hide('save-cookie-modal')
            },

            tryToSaveDataInCache(){
                let fullName=this.cacheCookieName+this.suffixName
                getFromCache(fullName).then((value)=>{
                    if(value){
                        this.showConfirmOverwrite()
                    }else{
                        this.confirmOverwrite()
                    }
                }).catch(()=>{
                    this.confirmOverwrite()
                })
            },
            showConfirmOverwrite(){
                this.$modal.show('overwrite-cookie-confirm-modal')
            },
            hideConfirmOverwrite(){
                this.$modal.hide('overwrite-cookie-confirm-modal')
            },
            confirmOverwrite(){
                this.saveInCache(this.pageData,this.suffixName)
                this.hideConfirmOverwrite()
                this.hideSaveNowModal()
            },
            saveAs(name){
                this.suffixName=name.slice(this.cacheCookieName.length)
            }
        }
    }
</script>

<style scoped>

</style>
