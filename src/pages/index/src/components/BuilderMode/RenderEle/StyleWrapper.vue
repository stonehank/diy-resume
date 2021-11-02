<template>
    <v-hover v-slot="{ hover }" :value="hoverActive">
        <component :is="tag"
                   @click.prevent="()=>{}"
                   class="render-item-wrapper"
                   :class="`${level!=null ? 'handle-'+level : ''}`"
                   :style="{
                   margin:noPaMa ? null : curData.styleConfig.margin.map(num=>num+'px').join(' '),
                   padding: noPaMa ? null : curData.styleConfig.padding.map(num=>num+'px').join(' '),
                   color:curData.styleConfig.color,
                   fontSize:resolveStrToNum(curData.styleConfig.fontSize),
                   // backgroundColor:curData.styleConfig.background,
                   backgroundColor:textMode ? 'inherit' : curData.styleConfig.background,
                   letterSpacing:resolveStrToNum(curData.styleConfig.letterSpacing),
                   lineHeight:resolveStrToNum(curData.styleConfig.lineHeight),
                   textAlign:curData.styleConfig.textAlign,
                   fontWeight:curData.styleConfig.fontWeight,
                   fontStyle:curData.styleConfig.fontStyle,

                   borderWidth:noBorder ? null : mergeBorderWidth,
                   borderColor:noBorder ? null : curData.styleConfig.borderColor,
                   borderRadius:noBorder ? null : mergeBorderRadius,
                   borderStyle:noBorder ? null : curData.styleConfig.borderStyle,

                    // transform:curData.styleConfig.transform,
                  }"
        >

            <div class="element-mask" :class="{'on-render-hover':hover}" v-show="editable && !textMode"></div>
            <div class="ele-action-wrapper" v-if="hover && editable && !textMode">
                <TooltipIconBtn data-test="save-builder-tool" color="primary" :click-event="saveAsTemplate" icon="far fa-save" tips="Save as custom unit" />
                <TooltipIconBtn data-test="config-builder-tool" color="primary" :click-event="showConfig" icon="fas fa-cog" tips="Config setting" />
                <TooltipIconBtn data-test="remove-builder-tool" color="error" :click-event="remove" icon="fas fa-trash-alt" tips="Remove" />
            </div>
            <slot name="default"></slot>
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
                        data-test="config-drawer"
                        :title="curData.name"
                        :hide_model="hideConfig"
                >
                    <template v-slot:config>
                        <CommonConfig v-model="curData">
                            <slot name="common-config"></slot>
                        </CommonConfig>
                    </template>
                    <template v-slot:position_config>
                        <PositionConfig v-model="curData">
                            <slot name="position-config"></slot>
                        </PositionConfig>
                    </template>
                    <template v-slot:border_config>
                        <BorderConfig v-model="curData">
                            <slot name="position-config"></slot>
                        </BorderConfig>
                    </template>
                    <template v-slot:template_config>
                        <TemplateConfig v-model="curData"></TemplateConfig>
                    </template>
                    <template v-slot:actions>
                        <v-btn @click="hideConfig">Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn style="min-width:200px;" color="success" @click="saveConfig">Save</v-btn>
                    </template>
                </ConfigEle>
            </NavigationDrawer>
        </component>
    </v-hover>
</template>




<script>
    import ConfigEle from "../config/components/ConfigEle"
    import TooltipIconBtn from "../../commons/TooltipIconBtn"
    import NavigationDrawer from "../../commons/NavigationDrawer"
    import CommonConfig from "../config/CommonConfig"
    import PositionConfig from "../config/PositionConfig"
    import BorderConfig from "../config/BorderConfig"
    import TemplateConfig from "../config/TemplateConfig"
    import WithPositionQuickMove from "../WithPositionQuickMove"




    export default {
        name: "StyleWrapper",
        components: {
            WithPositionQuickMove,
            TemplateConfig,
            BorderConfig,
            PositionConfig, CommonConfig, NavigationDrawer, TooltipIconBtn, ConfigEle},
        props:{
            tag:{
                default:'div'
            },
            noPaMa:{
                default:false
            },
            noBorder:{
                default:false
            },
            componentData:Object
        },
        model:{
            prop:'componentData',
            event:'input'
        },
        data(){
            return {
                /* hoverActive for test use */
                hoverActive:false,
                curData:this.componentData,
                editable:false,
                level:0,
                drawerShow:false,
                textMode:false,
                mergeBorderRadius:this.$parent.mergeBorderRadius,
                mergeBorderWidth:this.$parent.mergeBorderWidth,
                maxWidth:Infinity,
            }
        },
        mounted(){
            let winW=$(window).width()
            let pageW=$('#page').outerWidth() + 32
            this.maxWidth=winW - pageW
            /**
             * Noted: Automatically fetch the below properties:
             *      curData.styleConfig / componentData.styleConfig(use in preview)
             *      level
             *      editable
             *      textMode
             *      showConfig(defined in RenderTemplate)
             *      removeEle(defined in RenderTemplate)
             *      saveAsTemplate(defined in RenderTemplate)
             */
            let props=this.$parent.$props
            this.updatePropsFromParent(props)
            // if(this.curData)this.updateCurDataFromParent(this.curData)
        },
        watch:{
            componentData:{
                deep:true,
                handler:function(newVal){
                    this.curData= newVal
                }
            },
            curData:function(newVal){
                this.$emit('input',newVal)
            },
            '$parent.$props':{
                deep:true,
                handler(newV,oldV){
                    // console.log(newV,oldV)
                    this.updatePropsFromParent(newV)
                    // this.updateCurDataFromParent(newV)
                }
            },
            '$parent.mergeBorderRadius':{
                deep:true,
                handler(newV){
                    this.mergeBorderRadius=newV
                }
            },
            '$parent.mergeBorderWidth':{
                deep:true,
                handler(newV){
                    this.mergeBorderWidth=newV
                }
            },
            // '$parent.curData':{
            //     deep:true,
            //     handler(newV){
            //         this.updateCurDataFromParent(newV)
            //     }
            // },
            '$parent.drawerShow':{
                deep:true,
                handler(newV){
                    this.updateDrawerShowFromParent(newV)
                }
            }
        },
        methods:{
            updatePropsFromParent(props){
                this.editable=props.editable!=null ? props.editable : this.editable
                this.level=props.level !=null ? props.level : this.level
                this.textMode=props.textMode !=null ? props.textMode : this.textMode
                if(this.editable && (
                    !this.$parent.showConfig
                    || !this.$parent.removeEle
                    || !this.$parent.saveAsTemplate
                    || !this.$parent.updateDrawer
                    || !this.$parent.hideConfig
                    || !this.$parent.saveConfig
                )){
                    throw new Error('There some methods missing in StyleWrapper, noted the <StyleWrapper> if is used ' +
                        'as "editable", the parent Component must defined <showConfig> <removeEle> <saveAsTemplate> <updateDrawer>')
                }
            },
            updateDrawerShowFromParent(val){
                this.drawerShow=val
            },
            updateDrawer(val){
              this.$parent.updateDrawer(val)
            },

            showConfig(){
                this.$parent.showConfig()
            },
            hideConfig(){
                this.$parent.hideConfig()
            },
            saveConfig(){
                this.$parent.saveConfig()
            },
            remove(){
                this.$parent.removeEle()
            },
            saveAsTemplate(){
                this.$parent.saveAsTemplate()
            },
            resolveStrToNum(data,suffix='px'){
                if(!data)return 'inherit'
                return data==='inherit' ? data : (typeof data === 'string' ? parseFloat(data) : data)+suffix
            }
        }
    }
</script>
