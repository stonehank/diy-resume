<template>
    <div ref="template-select-list" class="py-2 px-4">
        <v-list-item >
            <v-list-item-content>
                <v-btn text color="success" @click="importFile">导入模板</v-btn>
            </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-0 mb-2"></v-divider>
        <PerfectScrollbar :style="'height:'+scrollHeight+'px'" ref="template-scroll-list">
            <v-card v-for="(template,index) in templateList"
                    :loading="chooseLoading[index]"
                    :key="index"
                    @click="()=>selectCurTemplate(index)"
                    class="overflow-hidden mb-2"
                    data-test="choose-template-card"
                    style="position:relative;margin:auto;"
                    :style="{height:previewCardH+'px',width:previewCardW+'px'}"
            >
                <PreviewPage :page-data="templateToPageData(template,personalInfo)" :scale="previewScale" >
                </PreviewPage>
            </v-card>
        </PerfectScrollbar>
    </div>
</template>

<script>

    import PreviewPage from "../../BuilderMode/PreviewPage/index"
    import templateToPageData from '../../../utils/data/template-to-pagedata'
    import calcPreviewSizeScale from "../../../utils/calcPreviewSizeScale"
    export default {
        name: "ChooseTemplate",
        components: {PreviewPage},
        props:{
            templateList:Array,
            personalInfo:Object,
            updateSelectTemplate:Function,
            importFile:Function
        },
        computed:{
            templateToPageData:()=>templateToPageData
        },
        mounted(){
            this.calcPreviewSize()
            let winH=$(window).height()
            let offset=this.$refs['template-scroll-list'].$el.offsetTop + 8
            // console.log(this.$refs['template-scroll-list'])
            this.scrollHeight=winH - offset
        },
        data(){
            return {
                scrollHeight:500,
                previewScale:0.3,
                previewCardW:100,
                previewCardH:200,
                chooseLoading:[]
            }
        },
        methods:{
            calcPreviewSize(){
                let {
                    previewCardH,previewScale,previewCardW
                }=calcPreviewSizeScale(this.$refs['template-select-list'],{
                    width:'auto',
                    height:'auto'
                })
                this.previewCardH=previewCardH
                this.previewCardW=previewCardW
                this.previewScale=previewScale
            },
            updateIndexLoading(index,status){
                this.chooseLoading[index]=status
                this.chooseLoading=this.chooseLoading.slice()
            },
            selectCurTemplate(index){
                this.updateIndexLoading(index,true)
                let template=this.templateList[index]
                setTimeout(()=>{
                    this.updateIndexLoading(index,false)
                    if(template.version!==pageConfig.version)return
                    this.updateSelectTemplate(template)
                },300)

            }
        }
    }
</script>

<style scoped>

</style>
