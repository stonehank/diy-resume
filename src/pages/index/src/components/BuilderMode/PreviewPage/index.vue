<template>
    <div class="preview-page" :style="`transform:scale(${scale})`">
        <slot></slot>
        <div class="render-wrapper clearfix">
            <div v-for="(component,index) in pageData"
                 :class="`col-${component.styleConfig.col}`"
                 class="draggable-custom-item"
                 :ref="component.id"
                 :style="{
                        height:component.styleConfig.height ? component.styleConfig.height : 'auto',
                       top:component.styleConfig.top==='auto' ? 'auto' : component.styleConfig.top+'px',
                       left:component.styleConfig.left==='auto' ? 'auto' : component.styleConfig.left+'px',
                       right:component.styleConfig.right==='auto' ? 'auto' : component.styleConfig.right+'px',
                       bottom:component.styleConfig.bottom==='auto' ? 'auto' : component.styleConfig.bottom+'px',
                       position:component.styleConfig.position,
                        zIndex:component.styleConfig.position==='absolute' ? 5 : 'auto',
                     }"
                 :key="component.id"
            >
                <PreviewSheet
                        v-if="component.name==='sheet'"
                        :editable="false"
                        :component-data="component"
                        :index="index"
                />
                <PreviewList
                        v-else-if="component.name==='list'"
                        :editable="false"
                        :component-data="component"
                        :index="index"
                />
                <PreviewParagraph
                        v-else-if="component.name==='paragraph'"
                        :editable="false"
                        :component-data="component"
                        :index="index"
                />
                <PreviewProgress
                        v-else-if="component.name==='progress'"
                        :editable="false"
                        :component-data="component"
                        :index="index"
                />
                <PreviewAnchor
                        v-else-if="component.name==='anchor'"
                        :editable="false"
                        :component-data="component"
                        :index="index"
                />
                <PreviewTag
                        v-else-if="component.name==='tag'"
                        :editable="false"
                        :component-data="component"
                        :index="index"
                />
                <PreviewImage
                        v-else-if="component.name==='image'"
                        :editable="false"
                        :component-data="component"
                        :index="index"
                />
            </div>
        </div>

    </div>
</template>

<script>
    import PreviewSheet from "./PreviewSheet"
    import PreviewParagraph from "./PreviewParagraph"
    import PreviewList from "./PreviewList"
    import PreviewProgress from "./PreviewProgress"
    import PreviewTag from "./PreviewTag"
    import PreviewAnchor from "./PreviewAnchor"
    import PreviewImage from "./PreviewImage"
    export default {
        name: "PreviewPage",
        components: {
            PreviewImage,
            PreviewAnchor,
            PreviewTag,
            PreviewProgress,
            PreviewList,
            PreviewParagraph,
            PreviewSheet,
        },
        props:{
            pageData:Array,
            scale:{
                default:1
            },
        },
    }
</script>

<style scoped>

</style>
