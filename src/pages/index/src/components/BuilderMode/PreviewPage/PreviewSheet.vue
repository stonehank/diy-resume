<template>
    <div style="width:100%;height:100%;position:relative"
         :style="{
                   margin:componentData.styleConfig.margin.map(num=>num+'px').join(' '),
                   padding:componentData.styleConfig.padding.map(num=>num+'px').join(' '),
                   color:componentData.styleConfig.color,
                   fontSize:componentData.styleConfig.fontSize+'px',
                   backgroundColor:componentData.styleConfig.background,
                   letterSpacing:componentData.styleConfig.letterSpacing+'px',
                   lineHeight:componentData.styleConfig.lineHeight+'px',
                   backgroundColor:componentData.styleConfig.background,
                   textAlign:componentData.styleConfig.textAlign,
                   fontWeight:componentData.styleConfig.fontWeight,
                   fontStyle:componentData.styleConfig.fontStyle,

                   borderWidth: mergeBorderWidth,
                   borderColor: componentData.styleConfig.borderColor,
                   borderRadius:mergeBorderRadius,
                   borderStyle:componentData.styleConfig.borderStyle,
                    // transform:componentData.styleConfig.transform,
               }"
         class="sheet-wrapper clearfix"
    >
        <div
                v-if="componentData.children.length>0"
                v-for="(component,index) in componentData.children"
                class="draggable-custom-item"
                :ref="component.id"
                :style="{
                   height:component.styleConfig.height ? component.styleConfig.height : 'auto',
                    top:component.styleConfig.top==='auto' ? 'auto' : component.styleConfig.top+'px',
                     left:component.styleConfig.left==='auto' ? 'auto' : component.styleConfig.left+'px',
                     right:component.styleConfig.right==='auto' ? 'auto' : component.styleConfig.right+'px',
                     bottom:component.styleConfig.bottom==='auto' ? 'auto' : component.styleConfig.bottom+'px',
                     position:component.styleConfig.position,
                     zIndex:component.styleConfig.position==='absolute' ? 4 : 'auto',
                }"
                :class="`col-${component.styleConfig.col}`"
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
</template>

<script>
    import PreviewSheet from "./PreviewSheet"
    import PreviewParagraph from "./PreviewParagraph"
    import PreviewList from "./PreviewList"
    import PreviewProgress from "./PreviewProgress"
    import PreviewTag from "./PreviewTag"
    import PreviewAnchor from "./PreviewAnchor"
    import PreviewImage from "./PreviewImage"
    import PreviewTemplate from "./PreviewTemplate"
    export default {
        name: "PreviewSheet",
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
            componentData:Object
        },
        extends:PreviewTemplate
    }
</script>

<style scoped>

</style>
