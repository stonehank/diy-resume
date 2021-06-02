<template>
    <draggable
            class="render-wrapper clearfix"
            :group="{ name: group}"
            :draggable="'.can-be-drag-'+level"
            :disabled="textMode"
            :list="componentList"
            :handle="'.handle-'+level"
            @start="(ev)=>detectStart(componentList[ev.oldIndex])"
            :forceFallback="true"
    >
        <div v-for="(component,index) in componentList"
             :id="component.id"
             :ref="component.id"
             @click.prevent="()=>toggleTransition(component)"
             class="draggable-custom-item"
             :style="{
                height:component.styleConfig.height ? component.styleConfig.height : 'auto',
                top:component.styleConfig.top==='auto' ? 'auto' : component.styleConfig.top+'px',
                left:component.styleConfig.left==='auto' ? 'auto' : component.styleConfig.left+'px',
                right:component.styleConfig.right==='auto' ? 'auto' : component.styleConfig.right+'px',
                bottom:component.styleConfig.bottom==='auto' ? 'auto' : component.styleConfig.bottom+'px',
                position:component.styleConfig.position,
                zIndex:component.styleConfig.position==='absolute' ? 5 : 'auto',
             }"
             :class="`col-${component.styleConfig.col}
             ${(curPagePinEle[component.id] || transitionMode[component.id]
             )
             ? ''
             : 'can-be-drag-'+level }`"
             :key="component.id"
        >
            <RenderSheet
                    v-if="component.name==='sheet'"
                    :editable="!transitionMode[component.id]"
                    :group="group"
                    :component-data="component"
                    :ref="'component_child_'+component.id"
                    :level="level"
                    :textMode="textMode"
                    :index="index"
                    :hasPin="curPagePinEle[component.id]"
                    :toggleSheetPin="toggleSheetPin"
                    :updateComponentData="(newItem)=>updateComponentData(index,newItem)"
                    :removeComponentData="removeComponentData"
                    :saveAsCustomTemplate="saveAsCustomTemplate"
            />
            <RenderCommonElements
                    v-else
                    :ref="'component_child_'+component.id"
                    :editable="!transitionMode[component.id]"
                    :component-data="component"
                    :level="level"
                    :textMode="textMode"
                    :index="index"
                    :updateComponentData="(newItem)=>updateComponentData(index,newItem)"
                    :removeComponentData="removeComponentData"
                    :saveAsCustomTemplate="saveAsCustomTemplate"
            />
            <WithPositionQuickMove v-if="transitionMode[component.id]"
                                   :componentData="component"
                                   :index="index"
                                   :updateComponentData="updateComponentData"/>
        </div>
    </draggable>
</template>

<script>
    import absoluteMoveLogic from "./mixin/absoluteMoveLogic"
    window.$$=require('jquery')
    import draggable from 'vuedraggable'
    import RenderSheet from "./RenderEle/RenderSheet"
    import deepClone from 'clone-deep'
    import RenderCommonElements from "./RenderEle/RenderCommonElements"
    import WithPositionQuickMove from "./WithPositionQuickMove"
    export default {
        name: "DIYRender",
        props:{
            group:String,
            componentList:Array,
            updatePageList:Function,
            removeElement:Function,
            saveAsCustomTemplate:Function,
            textMode:Boolean,
        },
        components: {
            WithPositionQuickMove,
            RenderCommonElements,
            RenderSheet,
            draggable,
        },
        mixins:[absoluteMoveLogic],
        data(){
            return {
                level:0,
                curPagePinEle:{},
            }
        },
        methods:{
            updateComponentData(index,newItem){
                let newPageList=this.componentList
                newPageList[index]=newItem
                this.updatePageList(deepClone(newPageList))
            },
            removeComponentData(indexList){
                if(!Array.isArray(indexList)){
                    indexList=[indexList]
                }
                this.removeElement(indexList)
            },
            toggleSheetPin(id){
                this.curPagePinEle[id]=!this.curPagePinEle[id]
                this.curPagePinEle=deepClone(this.curPagePinEle)
            }
        }
    }
</script>

<style scoped>
    .render-wrapper{
        /*padding:8px;*/
        padding-bottom:40px;
        /*width: 100%;*/
        /*height: 100%;*/
        /*min-height: 15px;*/
        /*padding-bottom:16px;*/
        /*overflow: hidden;*/
    }
</style>
