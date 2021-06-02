<template>
    <StyleWrapper v-model="curData">
        <template v-slot:default>
            <label class="pb-2"
                   :style="{
                   color:'inherit',
                   fontSize:'inherit',
                   backgroundColor:'inherit',
                   letterSpacing:'inherit',
                   lineHeight:'inherit',
               }"
            >
                <span v-if="!textMode">{{curData.config.label}}</span>
                <v-text-field v-else
                              dense hide-details filled
                              @blur="debounceUpdateData"
                              v-model="curData.config.label" />
            </label>
            <v-progress-linear
                    v-if="curData.config.style==='linear' || curData.config.style==null"
                    :buffer-value="curData.config.total"
                    :value="curData.config.value"
                    :color="curData.config.valueColor"
                    :backgroundColor="curData.config.backgroundColor"
                    :height="curData.config.height"
                    :rounded ="curData.config.rounded"
            ></v-progress-linear>
            <ProgressLineSegment
                    v-else-if="curData.config.style==='segment'"
                    :buffer-value="curData.config.total"
                    :value="curData.config.value"
                    :color="curData.config.valueColor"
                    :backgroundColor="curData.config.backgroundColor"
                    :height="curData.config.height"
                    :segment-width="curData.config.eachSegmentValue"
            />
        </template>
        <template v-slot:common-config>
            <div class="col-12">
                <label>Label</label>
                <v-text-field
                        dense
                        hide-details
                        v-model="curData.config.label"
                >
                </v-text-field>
            </div>
            <CommonInputConfig class="col-6 col-md-4"
                               :min="0"
                               :max="curData.config.total"
                               label="Progress value"
                               v-model="curData.config.value" />

            <CommonInputConfig class="col-6 col-md-4"
                               :min="0"
                               label="Progress total"
                               v-model="curData.config.total" />

            <CommonInputConfig class="col-6 col-md-4"
                               :min="0"
                               label="Progress height"
                               v-model="curData.config.height" />

            <div class="row col-12">
                <CommonSelectConfig
                        class="col-12 col-md-4"
                        label="Progress type"
                        :items="['linear','segment']"
                        v-model="curData.config.style"
                />

                <CommonInputConfig
                        v-if="curData.config.style==='segment'"
                        class="col-12 col-md-6"
                        :min="1"
                        label="Each Segment Value"
                        v-model="curData.config.eachSegmentValue" />
                <div class="col-12 col-md-6"
                     v-if="curData.config.style==='linear'"
                >
                    <label>Rounded</label>
                    <v-checkbox
                            dense
                            hide-details
                            v-model="curData.config.rounded"
                    >
                    </v-checkbox>
                </div>
            </div>

            <CommonColorConfig class="col-12 col-md-6"
                               :uid="'progress-color-'+curData.id"
                               label="Progress color"
                               v-model="curData.config.valueColor"
            />
            <CommonColorConfig class="col-12 col-md-6"
                               :uid="'progress-background-color-'+curData.id"
                               label="Progress background color"
                               v-model="curData.config.backgroundColor"
            />
        </template>

    </StyleWrapper>
</template>

<script>
    import RenderTemplate from './RenderTemplate'
    import StyleWrapper from "./StyleWrapper"
    import ConfigEle from "../config/components/ConfigEle"
    import CommonConfig from "../config/CommonConfig"
    import CommonInputConfig from "../config/components/CommonInputConfig"
    import PositionConfig from "../config/PositionConfig"
    import CommonColorConfig from "../config/components/CommonColorConfig"
    import ComponentConfigModal from "../../commons/ComponentConfigModal"
    import NavigationDrawer from "../../commons/NavigationDrawer"
    import ProgressLineSegment from "../../commons/ProgressLineSegment"
    import CommonSelectConfig from "../config/components/CommonSelectConfig"
    export default {
        name: "RenderProgress",
        components: {
            CommonSelectConfig,
            ProgressLineSegment,
            NavigationDrawer,
            ComponentConfigModal,
            CommonColorConfig, PositionConfig, CommonInputConfig, CommonConfig, ConfigEle, StyleWrapper},
        extends:RenderTemplate,
    }
</script>

<style scoped lang="scss" src="./render-style.scss"></style>
