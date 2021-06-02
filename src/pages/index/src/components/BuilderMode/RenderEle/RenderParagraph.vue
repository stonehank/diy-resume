<template>
    <StyleWrapper tag="p" v-model="curData">
        <template v-slot:default>
            <span v-if="!textMode">
                <i v-if="curData.config.icon && curData.config.prependIcon" :class="curData.config.prependIcon"></i>
                {{curData.config.value}}
                <i v-if="curData.config.icon && curData.config.appendIcon" :class="curData.config.appendIcon"></i>
            </span>
            <v-text-field v-else
                          data-test="paragraph-quick-edit"
                          dense hide-details filled
                          @blur="debounceUpdateData"
                          v-model="curData.config.value" />
        </template>
        <template v-slot:common-config>
            <TextInputWithIcon v-model="curData" label="Text" />
        </template>
    </StyleWrapper>
</template>

<script>
    import RenderTemplate from './RenderTemplate'
    import StyleWrapper from "./StyleWrapper"
    import ConfigEle from "../config/components/ConfigEle"
    import ColSizeConfig from "../config/components/ColSizeConfig"
    import MarginConfig from "../config/components/MarginConfig"
    import PaddingConfig from "../config/components/PaddingConfig"
    import CommonInputConfig from "../config/components/CommonInputConfig"
    import CommonColorConfig from "../config/components/CommonColorConfig"
    import CommonConfig from "../config/CommonConfig"
    import PositionConfig from "../config/PositionConfig"
    import ComponentConfigModal from "../../commons/ComponentConfigModal"
    import NavigationDrawer from "../../commons/NavigationDrawer"
    import TextInputWithIcon from "../config/components/TextInputWithIcon"
    export default {
        name: "RenderParagraph",
        components: {
            TextInputWithIcon,
            NavigationDrawer,
            ComponentConfigModal,
            PositionConfig,
            CommonConfig,
            CommonColorConfig,
            CommonInputConfig, PaddingConfig, MarginConfig, ColSizeConfig, ConfigEle, StyleWrapper
        },
        extends:RenderTemplate,
    }
</script>

<style scoped lang="scss" src="./render-style.scss"></style>
