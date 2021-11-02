<template>
    <StyleWrapper tag="p"
                  :componentData="componentData"
    >
        <GenerateSVGIcon
                v-if="componentData.config.icon && componentData.config.prependIcon"
                :icon="componentData.config.prependIcon"
                :styleConfig="componentData.styleConfig"
        />
        {{componentData.config.value}}
        <GenerateSVGIcon
                v-if="componentData.config.icon && componentData.config.appendIcon"
                :icon="componentData.config.appendIcon"
                :styleConfig="componentData.styleConfig"
        />
    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    import MobileAltSolid from 'assetsDir/fonts/svgs/solid/mobile-alt.svg'
    import GenerateSVGIcon from "../../commons/GenerateSVGIcon"
    export default {
        name: "PreviewParagraph",
        components: {GenerateSVGIcon, StyleWrapper,MobileAltSolid},
        extends:PreviewTemplate,
    }
</script>
