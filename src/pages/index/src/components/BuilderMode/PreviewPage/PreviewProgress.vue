<template>
    <StyleWrapper :componentData="componentData">
        <label class="pb-2"
               :style="{
                   color:'inherit',
                   fontSize:'inherit',
                   backgroundColor:'inherit',
                   letterSpacing:'inherit',
                   lineHeight:'inherit',
               }"
        >{{componentData.config.label}}</label>
        <v-progress-linear
                v-if="componentData.config.style==='linear' || componentData.config.style==null"
                :buffer-value="componentData.config.total"
                :value="componentData.config.value"
                :color="componentData.config.valueColor"
                :backgroundColor="componentData.config.backgroundColor"
                :height="componentData.config.height"
                :rounded ="componentData.config.rounded"
        ></v-progress-linear>
        <ProgressLineSegment
                v-else-if="componentData.config.style==='segment'"
                :buffer-value="componentData.config.total"
                :value="componentData.config.value"
                :color="componentData.config.valueColor"
                :backgroundColor="componentData.config.backgroundColor"
                :height="componentData.config.height"
                :segment-width="componentData.config.eachSegmentValue"
        />
    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    import ProgressLineSegment from "../../commons/ProgressLineSegment"
    export default {
        name: "PreviewProgress",
        components: {ProgressLineSegment, StyleWrapper},
        extends:PreviewTemplate,
    }
</script>
