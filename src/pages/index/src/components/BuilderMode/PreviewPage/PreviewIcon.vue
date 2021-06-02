<template>
    <StyleWrapper tag="i"
                  :class="componentData.config.value"
                  :component-data="componentData"
    >
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
