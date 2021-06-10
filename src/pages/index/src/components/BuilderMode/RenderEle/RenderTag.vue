<template>
    <StyleWrapper
            :calc-padding="false"
            :calc-margin="false"
            :no-pa-ma="true"
            :no-border="true"
            v-model="curData"
            style="padding:8px;"
    >
        <template v-slot:default>
            <div class="style-wrapper"
                 :style="{
                textAlign:curData.styleConfig.textAlign,
                padding:curData.styleConfig.padding.map(num=>num+'px').join(' '),
                margin:curData.styleConfig.margin.map(num=>num+'px').join(' '),
                borderWidth:mergeBorderWidth,
                borderRadius:mergeBorderRadius,
                borderColor:curData.styleConfig.borderColor,
                borderStyle:curData.styleConfig.borderStyle,
            }">
                <span v-if="!textMode">{{curData.config.value}}</span>
                <v-text-field v-else
                              dense hide-details filled
                              @blur="debounceUpdateData"
                              v-model="curData.config.value" />
            </div>
        </template>
        <template v-slot:common-config>
            <div class="col-12">
                <label>Text</label>
                <v-text-field
                        dense
                        hide-details
                        v-model="curData.config.value"
                >
                </v-text-field>
            </div>
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
        name: "RenderTag",
        extends:RenderTemplate,
        components: {
            NavigationDrawer,
            ComponentConfigModal,
            PositionConfig, CommonColorConfig, CommonInputConfig, CommonConfig, ConfigEle, StyleWrapper
        },
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
