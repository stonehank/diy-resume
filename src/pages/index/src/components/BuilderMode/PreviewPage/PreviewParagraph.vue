<template>
    <StyleWrapper tag="p"
                  :componentData="componentData"
    >
        <GenerateSVGIcon
                v-if="componentData.config.icon && componentData.config.prependIcon"
                :icon="componentData.config.prependIcon"
                :styleConfig="componentData.styleConfig"
        />
<!--        <span v-else-if="!curData.config.textarea">-->
<!--                <i v-if="curData.config.icon && curData.config.prependIcon" :class="curData.config.prependIcon"></i>-->
<!--                {{curData.config.value}}-->
<!--                <i v-if="curData.config.icon && curData.config.appendIcon" :class="curData.config.appendIcon"></i>-->
<!--            </span>-->
<!--        <div v-else>-->
<!--            <i v-if="curData.config.icon && curData.config.prependIcon" :class="curData.config.prependIcon"></i>-->
<!--            <pre>{{curData.config.value}}</pre>-->
<!--            <i v-if="curData.config.icon && curData.config.appendIcon" :class="curData.config.appendIcon"></i>-->
<!--        </div>-->
        <pre v-if="componentData.config.textarea">{{componentData.config.value}}</pre>
        <span v-else v-frag>{{componentData.config.value}}</span>
        <GenerateSVGIcon
                v-if="componentData.config.icon && componentData.config.appendIcon"
                :icon="componentData.config.appendIcon"
                :styleConfig="componentData.styleConfig"
        />
    </StyleWrapper>
</template>

<script>
    import PreviewTemplate from "./PreviewTemplate"
    import StyleWrapper from "../RenderEle/StyleWrapper"
    import MobileAltSolid from 'assetsDir/fonts/svgs/solid/mobile-alt.svg'
    import GenerateSVGIcon from "../../commons/GenerateSVGIcon"
    export default {
        name: "PreviewParagraph",
        components: {GenerateSVGIcon, StyleWrapper,MobileAltSolid},
        extends:PreviewTemplate,
    }
</script>
