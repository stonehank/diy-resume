<template>
    <div v-frag>
        <RenderParagraph
                v-if="componentData.name==='paragraph'"
                :componentData="componentData"
                v-bind="$attrs"
        />
        <RenderList
                v-else-if="componentData.name==='list'"
                :componentData="componentData"
                v-bind="$attrs"
        />
        <RenderProgress
                v-else-if="componentData.name==='progress'"
                :componentData="componentData"
                v-bind="$attrs"
        />
        <RenderAnchor
                v-else-if="componentData.name==='anchor'"
                :componentData="componentData"
                v-bind="$attrs"
        />
        <RenderTag
                v-else-if="componentData.name==='tag'"
                :componentData="componentData"
                v-bind="$attrs"
        />
        <RenderImage
                v-else-if="componentData.name==='image'"
                :componentData="componentData"
                v-bind="$attrs"
        />
    </div>
</template>

<script>
    import RenderParagraph from "./RenderParagraph"
    import RenderProgress from "./RenderProgress"
    import RenderAnchor from "./RenderAnchor"
    import RenderTag from "./RenderTag"
    import RenderImage from "./RenderImage"
    import RenderList from "./RenderList"
    export default {
        name: "RenderCommonElements",
        components: {RenderList, RenderImage, RenderTag, RenderAnchor, RenderProgress, RenderParagraph},
        props:{
            componentData:Object,
        },
    }
</script>
