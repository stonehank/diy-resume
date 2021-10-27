<template>
    <StyleWrapper tag="p"
                  ref="paragraph-detect-icon"
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
    import html2canvas from "html2canvas"
    window.html2canvas=html2canvas
    export default {
        name: "PreviewParagraph",
        components: {StyleWrapper},
        extends:PreviewTemplate,
        // mounted(){
        //     if(this.componentData.config.icon && (this.componentData.config.prependIcon || this.componentData.config.appendIcon)){
        //         let ele=this.$refs['paragraph-detect-icon'].$el
        //         console.log('parent',ele.parentNode.parentNode.parentNode.parentNode)
        //         if(!ele)return
        //         html2canvas(ele.parentNode.parentNode.parentNode.parentNode).then((function(canvas) {
        //             $(ele).append(canvas);
        //         }))
        //     }
        // }
    }
</script>
