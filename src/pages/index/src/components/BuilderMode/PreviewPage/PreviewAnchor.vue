<template>
    <StyleWrapper
            tag="a"
            :componentData="componentData"
            :style="`text-decoration:${componentData.config.textDecoration}`"
            :href="componentData.config.href"
            @click.prevent="()=>{}"
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
        name: "PreviewAnchor",
        components: {StyleWrapper},
        extends:PreviewTemplate,
    }
</script>
