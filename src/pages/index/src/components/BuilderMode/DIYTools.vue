<template>
    <draggable
            :list="componentList"
            :group="{ name: group, pull: 'clone', put: false }"
            :sort="false"
            :clone="debugClone"
            class="tools-drag-wrapper"
            dragClass="custom-dragging"
            ghost-class="custom-ghost"
            :forceFallback="true"
            @start="startDrag"
            @end="endDrag"
    >
        <div v-for="component in componentList" :key="component.id">
            <ToolsParagraph v-if="component.name==='paragraph'" />
            <ToolsSheet v-else-if="component.name==='sheet'"/>
            <ToolsAnchorLink v-else-if="component.name==='anchor'"/>
            <ToolsList v-else-if="component.name==='list'"/>
            <ToolsProgress v-else-if="component.name==='progress'"/>
            <ToolsTag v-else-if="component.name==='tag'"/>
            <ToolsImage v-else-if="component.name==='image'"/>
        </div>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'
    import deepClone from 'clone-deep'
    import { v4 as uuidv4 } from 'uuid'
    import ToolsParagraph from "./ToolsEle/ToolsParagraph"
    import ToolsSheet from "./ToolsEle/ToolsSheet"
    import ToolsAnchorLink from "./ToolsEle/ToolsAnchorLink"
    import ToolsList from "./ToolsEle/ToolsList"
    import ToolsProgress from "./ToolsEle/ToolsProgress"
    import ToolsTag from "./ToolsEle/ToolsTag"
    import RenderList from "./RenderEle/RenderList.vue"
    import RenderSheet from "./RenderEle/RenderSheet.vue"
    import RenderParagraph from "./RenderEle/RenderParagraph.vue"
    import RenderProgress from "./RenderEle/RenderProgress.vue"
    import RenderAnchor from "./RenderEle/RenderAnchor.vue"
    import RenderTag from "./RenderEle/RenderTag.vue"
    import RenderImage from "./RenderEle/RenderImage.vue"
    import vueMountedComponent from "../../utils/vueMountedComponent"
    import ToolsImage from "./ToolsEle/ToolsImage"

    export default {
        name: "DIYTools",
        components: {
            ToolsImage,
            ToolsTag,
            ToolsProgress,
            ToolsList,
            ToolsAnchorLink,
            ToolsSheet,
            ToolsParagraph,
            draggable,
        },
        props:{
            group:String,
            componentList:Array
        },
        mounted(){
            $(document).on('mouseover',function(ev){
                let $target=$(ev.target)
                let $itemWrapper=$target.parents('.tools-item-wrapper')
                if ($itemWrapper.length) {
                    $itemWrapper.children('.element-mask').addClass('on-tools-hover')
                    $itemWrapper.children('.element-mask').siblings('.mask-content').show()
                }
            }).on('mouseout',function(ev){
                let $target=$(ev.target)
                let $itemWrapper=$target.parents('.tools-item-wrapper')
                if ($itemWrapper.length) {
                    $itemWrapper.children('.element-mask').removeClass('on-tools-hover')
                    $itemWrapper.children('.element-mask').siblings('.mask-content').hide()
                }
            })
        },
        destroyed() {
            $(document).off('mouseover mouseout')
        },
        data(){
            return {
                vueMountedComponentObj:{
                    list:RenderList,
                    sheet:RenderSheet,
                    paragraph:RenderParagraph,
                    progress:RenderProgress,
                    anchor:RenderAnchor,
                    tag:RenderTag,
                    image:RenderImage

                },
                originalHTML:null,
                draggingOriginal:null,
                draggingCol:null,
            }
        },
        methods:{
            startDrag(evt){
                let oldIdx=evt.oldIndex
                this.draggingOriginal=$('.tools-wrapper .sortable-chosen')
                let dragName=this.componentList[oldIdx].name
                this.draggingCol=this.componentList[oldIdx].styleConfig.col
                let dragEl=this.getMountRenderElementHTML(dragName)
                $('.diy-wrapper').on('mousemove',(ele)=>{
                    if($('.render-wrapper .sortable-chosen')[0]){
                        if(this.originalHTML)return
                        this.originalHTML=$('.render-wrapper .sortable-chosen').html()
                        $('.render-wrapper .sortable-chosen').html(dragEl).addClass('draggable-custom-item col-'+this.draggingCol)
                    }else if($('.tools-wrapper .sortable-chosen')[0] && this.originalHTML){
                        this.draggingOriginal.html(this.originalHTML).removeClass('draggable-custom-item col-'+this.draggingCol)
                        this.originalHTML=null
                    }
                })
            },
            endDrag(evt){
                $('.diy-wrapper').off('mousemove')
                let index=evt.oldIndex
                $('.tools-drag-wrapper').children().eq(index).removeClass('draggable-custom-item col-'+this.draggingCol)
                if(this.originalHTML){
                    this.draggingOriginal.html(this.originalHTML)
                    this.draggingOriginal=null
                    this.originalHTML=null
                }
                // $('.dragFrom').children().eq(fromIdx).removeClass('custom-ghost')
            },
            debugClone(origin){
                let newOne= deepClone(origin)
                newOne.id=uuidv4()
                return newOne
            },
            getMountRenderElementHTML(name){
                let Component=this.vueMountedComponentObj[name]
                let componentData=this.componentList.find(obj=>obj.name===name)
                return vueMountedComponent(Component,{
                    componentData:componentData,
                    group:this.group,
                    editable:false
                }).$el
            },
        }
    }
</script>

<style scoped>

</style>