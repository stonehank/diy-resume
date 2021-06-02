<template>
    <StyleWrapper
            :no-border="true"
            :style="{
                width:componentData.config.width+'px',
                height:componentData.config.height+'px',
                zIndex:3
            }"
            :componentData="componentData"
    >
        <img
                :src="componentData.config.value"
                alt=""
                style="width:100%;height:100%;"
                :style="{
                borderWidth:mergeBorderWidth,
                borderRadius:mergeBorderRadius,
                borderColor:componentData.styleConfig.borderColor,
                borderStyle:componentData.styleConfig.borderStyle,
            }" />

    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    export default {
        name: "PreviewImage",
        components: {StyleWrapper},
        extends:PreviewTemplate,
    }
</script>

<style scoped>

</style>
