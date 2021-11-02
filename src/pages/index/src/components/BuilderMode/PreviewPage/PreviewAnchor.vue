<template>
    <StyleWrapper
            tag="a"
            :componentData="componentData"
            :style="`text-decoration:${componentData.config.textDecoration}`"
            :href="componentData.config.href"
            @click.prevent="()=>{}"
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
<!--        <i v-if="componentData.config.icon && componentData.config.appendIcon" :class="componentData.config.appendIcon"></i>-->
    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    import GenerateSVGIcon from "../../commons/GenerateSVGIcon"
    export default {
        name: "PreviewAnchor",
        components: {GenerateSVGIcon, StyleWrapper},
        extends:PreviewTemplate,
    }
</script>
