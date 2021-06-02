<template>
    <StyleWrapper tag="p"
                  :componentData="componentData"
    >
        <i v-if="componentData.config.icon && componentData.config.prependIcon" :class="componentData.config.prependIcon"></i>
        {{componentData.config.value}}
        <i v-if="componentData.config.icon && componentData.config.appendIcon" :class="componentData.config.appendIcon"></i>
    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    export default {
        name: "PreviewParagraph",
        components: {StyleWrapper},
        extends:PreviewTemplate,
    }
</script>
