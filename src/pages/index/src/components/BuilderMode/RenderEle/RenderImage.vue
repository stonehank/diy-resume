<template>
    <StyleWrapper
            :noBorder="true"
            v-model="curData"
            :style="{
                width:curData.config.width+'px',
                height:curData.config.height+'px',
                zIndex:3
    }">
        <template v-slot:default>
            <img :src="curData.config.value"
                 ref="uploadImg"
                 style="width:100%;height:100%;"
                 alt=""
                 :style="{
                borderWidth:mergeBorderWidth,
                borderRadius:mergeBorderRadius,
                borderColor:curData.styleConfig.borderColor,
                borderStyle:curData.styleConfig.borderStyle,
             }"
            />
        </template>
        <template v-slot:common-config>
            <div class="col-12">
                <label>Image</label>
                <v-file-input
                        accept="image/*"
                        placeholder="Pick an image"
                        label="Avatar"
                        @change="getTheFile"
                ></v-file-input>
            </div>
            <CommonInputConfig class="col-6 col-md-4"
                               :min="0"
                               suffix="px"
                               label="Width"
                               v-model="curData.config.width" />
            <CommonInputConfig class="col-6 col-md-4"
                               :min="0"
                               suffix="px"
                               label="Height"
                               v-model="curData.config.height" />
        </template>
    </StyleWrapper>
</template>

<script>
    import RenderTemplate from "./RenderTemplate"
    import StyleWrapper from "./StyleWrapper"
    import ConfigEle from "../config/components/ConfigEle"
    import CommonConfig from "../config/CommonConfig"
    import CommonInputConfig from "../config/components/CommonInputConfig"
    import CommonColorConfig from "../config/components/CommonColorConfig"
    import PositionConfig from "../config/PositionConfig"
    import ComponentConfigModal from "../../commons/ComponentConfigModal"
    import NavigationDrawer from "../../commons/NavigationDrawer"
    export default {
        name: "RenderImage",
        extends:RenderTemplate,
        components: {
            NavigationDrawer,
            ComponentConfigModal,
            PositionConfig, CommonColorConfig, CommonInputConfig, CommonConfig, ConfigEle, StyleWrapper},
        data(){
            return {
                positionList:[
                    'absolute',
                    'relative'
                ]
            }
        },
        methods:{
            getTheFile(file){
                if(!file) {
                    this.curData.config.value=''
                    return
                }
                if(!!window.indexedDB){
                    let reader = new FileReader();
                    let self=this
                    reader.onload = ()=>{
                        self.curData.config.value = reader.result;
                    };
                    reader.readAsDataURL(file);
                }else{
                    this.curData.config.value=URL.createObjectURL(file)
                }

            },
        }
    }
</script>

<style scoped>
    .style-wrapper{
        display:flex;
        justify-content: center;
        align-content: center;
    }
</style>
<style scoped lang="scss" src="./render-style.scss"></style>
