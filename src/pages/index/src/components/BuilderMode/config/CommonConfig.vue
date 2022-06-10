<template>
    <div class="row">
        <slot></slot>
        <ColSizeConfig class="col-12" v-model="newComponentData.styleConfig.col" />
        <div class="col-12 d-flex align-center">
            <label style="font-size:1.2rem">Inherit Style</label>
        </div>
        <CommonInputConfig class="col-12 col-md-6 col-lg-4"
                           label="Font size"
                           :min="10"
                           cssType="fontSize"
                           :id="newComponentData.id"
                           v-model="newComponentData.styleConfig.fontSize"
                           :showStaticText="newComponentData.styleConfig.fontSizeInherit"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.fontSizeInherit"
            />
        </CommonInputConfig>
        <CommonSelectConfig class="col-12 col-md-6 col-lg-4"
                            :uid="'fontWeight-'+newComponentData.id"
                            :id="newComponentData.id"
                            label="Font Weight"
                            v-model="newComponentData.styleConfig.fontWeight"
                            :showStaticText="newComponentData.styleConfig.fontWeightInherit!==false"
                            cssType="fontWeight"
                            :items="fontWeightList"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.fontWeightInherit"
            />
        </CommonSelectConfig>
        <CommonSelectConfig class="col-12 col-md-6 col-lg-4"
                            :uid="'fontStyle-'+newComponentData.id"
                            :id="newComponentData.id"
                            label="Font Style"
                            v-model="newComponentData.styleConfig.fontStyle"
                            :showStaticText="newComponentData.styleConfig.fontStyleInherit!==false"
                            cssType="fontStyle"
                            :items="fontStyleList"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.fontStyleInherit"
            />
        </CommonSelectConfig>
        <CommonSelectConfig class="col-12 col-md-6 col-lg-4"
                            :uid="'textAlign-'+newComponentData.id"
                            :id="newComponentData.id"
                            label="Text align"
                            v-model="newComponentData.styleConfig.textAlign"
                            :showStaticText="newComponentData.styleConfig.textAlignInherit!==false"
                            cssType="textAlign"
                            :items="textAlignList"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.textAlignInherit"
            />
        </CommonSelectConfig>
        <CommonInputConfig class="col-12 col-md-6 col-lg-4"
                           label="Line Height"
                           suffix="px"
                           cssType="lineHeight"
                           :id="newComponentData.id"
                           v-model="newComponentData.styleConfig.lineHeight"
                           :showStaticText="newComponentData.styleConfig.lineHeightInherit"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.lineHeightInherit"
            />
        </CommonInputConfig>
        <!-- https://github.com/parallax/jsPDF/issues/3137#issuecomment-886480913 -->
        <CommonInputConfig class="col-12 col-md-6 col-lg-4"
                           :min="-4"
                           label="Letter Spacing"
                           suffix="px"
                           cssType="letterSpacing"
                           :id="newComponentData.id"
                           v-model="newComponentData.styleConfig.letterSpacing"
                           :showStaticText="newComponentData.styleConfig.letterSpacingInherit"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.letterSpacingInherit"
            />
        </CommonInputConfig>
        <CommonColorConfig class="col-12 col-md-6"
                           :uid="'color-'+newComponentData.id"
                           :id="newComponentData.id"
                           label="Font color"
                           v-model="newComponentData.styleConfig.color"
                           :showStaticText="newComponentData.styleConfig.colorInherit"
                           cssType="color"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.colorInherit"
            />
        </CommonColorConfig>
        <CommonColorConfig class="col-12 col-md-6"
                           :uid="'background-'+newComponentData.id"
                           :id="newComponentData.id"
                           label="Background color"
                           v-model="newComponentData.styleConfig.background"
                           :showStaticText="newComponentData.styleConfig.backgroundInherit"
                           cssType="backgroundColor"
        >
            <v-checkbox
                    slot="header"
                    label="inherit"
                    dense
                    hide-details
                    v-model="newComponentData.styleConfig.backgroundInherit"
            />
        </CommonColorConfig>
    </div>
</template>

<script>
    import ColSizeConfig from "./components/ColSizeConfig"
    import CommonInputConfig from "./components/CommonInputConfig"
    import CommonColorConfig from "./components/CommonColorConfig"
    import CommonSelectConfig from "./components/CommonSelectConfig"

    export default {
        name: "CommonConfig",
        components: {CommonSelectConfig, CommonColorConfig, CommonInputConfig, ColSizeConfig},
        props:{
            componentData:Object,
        },
        model:{
            prop:'componentData',
            event:'input'
        },
        data(){
            return{
                newComponentData:this.componentData,
                inheritItem:['color','fontSize','background','lineHeight','letterSpacing'],
                textAlignList:['left','center','right','justify'],
                fontWeightList:[{value:'100',text:'lighter'},{value:'400',text:'normal'},{value:'700',text:'bold'}],
                fontStyleList:['normal','italic'],
            }
        },
        watch:{
            componentData:{
                deep:true,
                handler:function(newVal){
                    this.newComponentData= newVal
                }
            },
            newComponentData:function(newVal){
                this.$emit('input',newVal)
            },
        },
    }
</script>

<style scoped>

</style>
