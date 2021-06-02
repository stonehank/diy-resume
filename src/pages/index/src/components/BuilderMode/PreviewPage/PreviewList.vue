<template>
    <StyleWrapper tag="ul"
                  :style="{
                      listStyle:componentData.config.listStyle
                  }"
                  :componentData="componentData"
    >
        <li class="render-item"
            v-for="(val,index) in componentData.config.value"
            :key="index"
            :style="{
                padding:componentData.config.dense ? 0 : '6px 0',
            }"
        >
            {{val}}
        </li>
    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    export default {
        name: "PreviewList",
        components: {StyleWrapper},
        extends:PreviewTemplate,
    }
</script>

<style scoped>
    .render-item{
        list-style: inherit;
        border-radius: inherit;
        font-size: inherit;
    }
</style>
