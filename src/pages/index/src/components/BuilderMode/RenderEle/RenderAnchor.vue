<template>
    <StyleWrapper
            tag="a"
            v-model="curData"
            :style="`text-decoration:${curData.config.textDecoration}`"
            :href="curData.config.href"
            @click.prevent="()=>{}"
    >
        <template v-slot:default>
            <span v-if="!textMode">
                <i v-if="curData.config.icon && curData.config.prependIcon" :class="curData.config.prependIcon"></i>
                {{curData.config.value}}
                <i v-if="curData.config.icon && curData.config.appendIcon" :class="curData.config.appendIcon"></i>
            </span>
            <div v-else>
                <v-text-field  dense hide-details
                               label="text"
                               filled
                               @blur="debounceUpdateData"
                               v-model="curData.config.value" />
                <v-text-field dense hide-details
                              label="href"
                              filled
                              @blur="debounceUpdateData"
                              v-model="curData.config.href" />
            </div>
        </template>
        <template v-slot:common-config>
            <TextInputWithIcon v-model="curData" label="Text" />
            <div class="col-12">
                <label>Hypertext reference</label>
                <v-text-field dense hide-details v-model="curData.config.href">

                </v-text-field>
            </div>
            <div class="col-4">
                <label>Text decoration</label>
                <v-select dense
                          hide-details
                          :items="textDecorationList"
                          v-model="curData.config.textDecoration">

                </v-select>
            </div>
        </template>
    </StyleWrapper>
</template>

<script>
    import RenderTemplate from './RenderTemplate'
    import StyleWrapper from "./StyleWrapper"
    import ConfigEle from "../config/components/ConfigEle"
    import CommonConfig from "../config/CommonConfig"
    import PositionConfig from "../config/PositionConfig"
    import ComponentConfigModal from "../../commons/ComponentConfigModal"
    import NavigationDrawer from "../../commons/NavigationDrawer"
    import TextInputWithIcon from "../config/components/TextInputWithIcon"
    export default {
        name: "RenderAnchor",
        components: {
            TextInputWithIcon,
            NavigationDrawer, ComponentConfigModal, PositionConfig, CommonConfig, ConfigEle, StyleWrapper},
        extends:RenderTemplate,
        data(){
            return {
                textDecorationList:['none','underline','overline']
            }
        }
    }
</script>

<style scoped lang="scss" src="./render-style.scss"></style>
