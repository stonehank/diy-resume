<template>
    <v-hover v-slot="{hover}">
        <div style="width:100%;height:100%;border: 1px dashed #fff;position:relative;"
             :style="{
                 margin:curData.styleConfig.margin.map(num=>num+'px').join(' '),
                    borderWidth: mergeBorderWidth,
                   borderColor: curData.styleConfig.borderColor,
                   borderRadius:mergeBorderRadius,
                   borderStyle:curData.styleConfig.borderStyle,
               }"
        >
            <div class="ele-action-wrapper" v-if="hover && editable" >
                <TooltipIconBtn :color="hasPin ? 'primary' : 'gray'"
                                :click-event="()=>toggleSheetPin(componentData.id)"
                                icon="fas fa-thumbtack"
                                :tips="hasPin ? 'Pined' : 'Pin'"
                />
                <TooltipIconBtn color="primary"
                                :click-event="()=>saveAsCustomTemplate(componentData)"
                                icon="fas fa-save"
                                tips="Save as custom unit"
                />
                <TooltipIconBtn color="primary"
                                :click-event="showConfig"
                                icon="fas fa-cog"
                                tips="Config setting"
                />
                <TooltipIconBtn color="error"
                                :click-event="removeEle"
                                icon="fas fa-trash-alt"
                                tips="Remove"
                />
            </div>
            <div :class="'handle-'+level" class="sheet-handle">Page, you can drop others inside</div>
            {{ /** Note: style need pass curData (change the style in realtime), but draggable should pass componentData */ }}
            <draggable
                    class="sheet-wrapper clearfix"
                    :disabled="!draggable || textMode"
                    :draggable="'.can-be-drag-'+level"
                    :group="{name: group}"
                    :list="componentData.children"
                    :handle="'.handle-'+(level+1)"
                    :forceFallback="true"
                    @start="(ev)=>detectStart(componentData.children[ev.oldIndex])"
                    :style="{
                   padding:curData.styleConfig.padding.map(num=>num+'px').join(' '),
                   fontSize:curData.styleConfig.fontSize+'px',
                   color:textMode ? 'inherit' : curData.styleConfig.color,
                   backgroundColor:textMode ? 'inherit' : curData.styleConfig.background,
                   letterSpacing:curData.styleConfig.letterSpacing+'px',
                   lineHeight:curData.styleConfig.lineHeight+'px',
                   textAlign:curData.styleConfig.textAlign,
                   fontWeight:curData.styleConfig.fontWeight,
                   fontStyle:curData.styleConfig.fontStyle,
               }"
            >
                <div
                        v-for="(subComponent,subIndex) in componentData.children"
                        :id="subComponent.id"
                        :ref="subComponent.id"
                        @click.prevent="()=>toggleTransition(subComponent)"
                        class="draggable-custom-item"
                        :style="{
                            height:subComponent.styleConfig.height ? subComponent.styleConfig.height : 'auto',
                            top:subComponent.styleConfig.top==='auto' ? 'auto' : subComponent.styleConfig.top+'px',
                             left:subComponent.styleConfig.left==='auto' ? 'auto' : subComponent.styleConfig.left+'px',
                             right:subComponent.styleConfig.right==='auto' ? 'auto' : subComponent.styleConfig.right+'px',
                             bottom:subComponent.styleConfig.bottom==='auto' ? 'auto' : subComponent.styleConfig.bottom+'px',
                             position:subComponent.styleConfig.position,
                             zIndex:subComponent.styleConfig.position==='absolute' ? 4 : 'auto',
                             // transform:subComponent.styleConfig.transform,
                        }"
                        :class="`col-${subComponent.styleConfig.col} ${curSheetPinEle[subComponent.id] || transitionMode[subComponent.id]
                         ? '' : 'can-be-drag-'+level }`"
                        :key="subComponent.id"
                >
                    <RenderSheet
                            v-if="subComponent.name==='sheet'"
                            :editable="editable && !transitionMode[subComponent.id]"
                            :group="group" :componentData="subComponent"
                            :level="level+1"
                            :index="subIndex"
                            :textMode="textMode"
                            :draggable="draggable"
                            :hasPin="curSheetPinEle[subComponent.id]"
                            :toggleSheetPin="toggleNextSheetPin"
                            :updateComponentData="(newItem)=>updateSheetComponentData(subIndex,newItem)"
                            :removeComponentData="removeEleInside"
                            :saveAsCustomTemplate="saveAsCustomTemplate"
                    />
                    <RenderCommonElements
                            v-else
                            :editable="editable && !transitionMode[subComponent.id]"
                            :componentData="subComponent"
                            :level="level+1"
                            :textMode="textMode"
                            :index="subIndex"
                            :updateComponentData="(newItem)=>updateSheetComponentData(subIndex,newItem)"
                            :removeComponentData="removeEleInside"
                            :saveAsCustomTemplate="saveAsCustomTemplate"
                    />
                    <WithPositionQuickMove v-if="editable && transitionMode[subComponent.id]"
                                           :componentData="subComponent"
                                           :index="subIndex"
                                           :updateComponentData="updateSheetComponentData"/>
                </div>
                <div v-if="componentData.children.length===0" class="empty-page-placeholder">Empty Page</div>
            </draggable>
            <NavigationDrawer
                    v-if="editable"
                    :style="`height:100vh;max-width:${maxWidth}px;min-width:280px;`"
                    fixed
                    right
                    top
                    :drawerShow="drawerShow"
                    @input="updateDrawer"
            >
                <ConfigEle
                        :title="componentData.name"
                        :hide_model="hideConfig"
                >
                    <template v-slot:config>
                        <CommonConfig v-model="curData">
                            <HeightConfig class="col-12 col-md-6" v-model="curData.styleConfig.height" />
                        </CommonConfig>
                    </template>
                    <template v-slot:position_config>
                        <PositionConfig v-model="curData"></PositionConfig>
                    </template>
                    <template v-slot:actions>
                        <v-btn small @click="hideConfig">Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success" small @click="saveConfig">Save</v-btn>
                    </template>
                    <template v-slot:template_config>
                        <TemplateConfig v-model="curData"></TemplateConfig>
                    </template>
                    <template v-slot:border_config>
                        <BorderConfig v-model="curData">
                            <slot name="position-config"></slot>
                        </BorderConfig>
                    </template>
                </ConfigEle>
            </NavigationDrawer>
        </div>
    </v-hover>
</template>

<script>
    import draggable from 'vuedraggable'
    import StyleWrapper from "./StyleWrapper"
    import RenderTemplate from "./RenderTemplate"
    import ConfigEle from "../config/components/ConfigEle"
    import CommonConfig from "../config/CommonConfig"
    import PositionConfig from "../config/PositionConfig"
    import deepClone from 'clone-deep'
    import HeightConfig from "../config/components/HeightConfig"
    import TooltipIconBtn from "../../commons/TooltipIconBtn"
    import NavigationDrawer from "../../commons/NavigationDrawer"
    import RenderCommonElements from "./RenderCommonElements"
    import TemplateConfig from "../config/TemplateConfig"
    import WithPositionQuickMove from "../WithPositionQuickMove"
    import absoluteMoveLogic from "../mixin/absoluteMoveLogic"
    import BorderConfig from "../config/BorderConfig"
    export default {
        name: "RenderSheet",
        extends:RenderTemplate,
        mixins:[absoluteMoveLogic],
        props:{
            group:String,
            isToolsGhost:Boolean,
            toggleSheetPin:Function,
            saveAsCustomTemplate:{
                type:Function,
                default:()=>{}
            },
            hasPin:Boolean,
            textMode:Boolean,
            draggable: {
                default:true
            }
        },
        components: {
            BorderConfig,
            WithPositionQuickMove,
            TemplateConfig,
            RenderCommonElements,
            NavigationDrawer,
            TooltipIconBtn,
            HeightConfig,
            PositionConfig,
            CommonConfig,
            ConfigEle,
            StyleWrapper,
            draggable,
        },
        data(){
            return {
                maxWidth:Infinity,
                curSheetPinEle:{},
            }
        },
        mounted(){
            let winW=$(window).width()
            let pageW=$('#page').outerWidth() + 32
            this.maxWidth=winW - pageW
        },
        methods:{
            saveConfig(){
                let checkWithChildrenData=this.curData
                checkWithChildrenData.children=this.componentData.children
                this.updateComponentData(checkWithChildrenData)
                this.hideConfig(true)
            },
            updateSheetComponentData(index,newItem){
                this.curData.children=deepClone(this.componentData.children)
                this.curData.children[index]=newItem
                this.updateComponentData(this.curData)
            },
            removeEleInside(indexList){
                if(!Array.isArray(indexList)){
                    indexList=[indexList]
                }
                let newIndexList=[this.index].concat(indexList)
                this.removeComponentData(newIndexList)
            },
            toggleNextSheetPin(id){
                this.curSheetPinEle[id]=!this.curSheetPinEle[id]
                this.curSheetPinEle=deepClone(this.curSheetPinEle)
            }
        }
    }
</script>

<style scoped>
    .sheet-wrapper{
        min-height: 60px;
        position: relative;
        border: 1px dashed var(--text-secondary);
        border-top: none;
        overflow: auto;
    }
    .sheet-handle{
        width: 100%;
        cursor:pointer;
        background: #e0e0e0;
        border:1px dashed var(--text-blur);
        border-bottom:2px solid var(--text-blur);
        border-radius: 4px 4px 0 0;
        font-size: 15px;
        padding: 2px 4px;
        color: var(--text-secondary);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .empty-page-placeholder{
        position:absolute;
        top:0;
        left:0;
        font-size: 24px;
        font-weight: bolder;
        color: var(--text-blur);
        padding: 10px 4px;
        width: 100%;
        text-align: center;
    }
</style>
<style scoped lang="scss" src="./render-style.scss"></style>
