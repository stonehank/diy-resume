<template>
    <StyleWrapper
            :no-pa-ma="true"
            :no-border="true"
            :componentData="componentData"
            style="padding:8px;"
    >
        <div
                class="style-wrapper"
                :style="{
                textAlign:'center',
                padding:componentData.styleConfig.padding.map(num=>num+'px').join(' '),
                margin:componentData.styleConfig.margin.map(num=>num+'px').join(' '),
                borderWidth:mergeBorderWidth,
                borderRadius:mergeBorderRadius,
                borderColor:componentData.styleConfig.borderColor,
                borderStyle:componentData.styleConfig.borderStyle,
            }">
            {{componentData.config.value}}
        </div>
    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    export default {
        name: "PreviewTag",
        components: {StyleWrapper},
        extends:PreviewTemplate,
    }
</script>

<style scoped>
    .style-wrapper{
        display:flex;
        justify-content: center;
        align-content: center;
    }
</style>
