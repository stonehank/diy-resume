<template>
    <div class="row">
        <slot></slot>
        <div class="row col-12">
            <div class="col-12">
                <label>Position</label>
                <v-select
                        :items="positionList"
                        v-model="newComponentData.styleConfig.position"
                        dense
                        hide-details>
                </v-select>
            </div>
            <CommonInputConfig class="col-6 col-md-4 col-lg-3"
                               :min="-Infinity"
                               suffix="px"
                               :id="newComponentData.id"
                               label="Top"
                               v-model="newComponentData.styleConfig.top"
                               :showStaticText="topAuto"
                               static-text="Auto"
                               css-type="top"
            >
                <v-checkbox
                        data-test="position-top"
                        slot="header"
                        label="auto"
                        dense
                        hide-details
                        v-model="topAuto"
                />
            </CommonInputConfig>
            <CommonInputConfig class="col-6 col-md-4 col-lg-3"
                               :min="-Infinity"
                               suffix="px"
                               :id="newComponentData.id"
                               label="Right"
                               v-model="newComponentData.styleConfig.right"
                               :showStaticText="rightAuto"
                               static-text="Auto"
                               css-type="right"
            >
                <v-checkbox
                        data-test="position-right"
                        slot="header"
                        label="auto"
                        dense
                        hide-details
                        v-model="rightAuto"
                />
            </CommonInputConfig>
            <CommonInputConfig class="col-6 col-md-4 col-lg-3"
                               :min="-Infinity"
                               suffix="px"
                               :id="newComponentData.id"
                               label="Bottom"
                               v-model="newComponentData.styleConfig.bottom"
                               :showStaticText="bottomAuto"
                               static-text="Auto"
                               css-type="bottom"
            >
                <v-checkbox
                        data-test="position-bottom"
                        slot="header"
                        label="auto"
                        dense
                        hide-details
                        v-model="bottomAuto"
                />
            </CommonInputConfig>
            <CommonInputConfig class="col-6 col-md-4 col-lg-3"
                               :min="-Infinity"
                               suffix="px"
                               :id="newComponentData.id"
                               label="Left"
                               v-model="newComponentData.styleConfig.left"
                               :showStaticText="leftAuto"
                               static-text="Auto"
                               css-type="left"
            >
                <v-checkbox
                        data-test="position-left"
                        slot="header"
                        label="auto"
                        dense
                        hide-details
                        v-model="leftAuto"
                />
            </CommonInputConfig>
        </div>
        <MarginConfig class="col-12" v-model="newComponentData.styleConfig.margin" />
        <PaddingConfig class="col-12" v-model="newComponentData.styleConfig.padding" />
    </div>
</template>

<script>
    import MarginConfig from "./components/MarginConfig"
    import PaddingConfig from "./components/PaddingConfig"
    import CommonInputConfig from "./components/CommonInputConfig"

    export default {
        name: "PositionConfig",
        components: {CommonInputConfig, PaddingConfig, MarginConfig},
        props:{
            componentData:Object,
        },
        model:{
            prop:'componentData',
            event:'input'
        },
        data(){
            return{
                newComponentData:this.componentData,
                positionList:['static','absolute','relative'],
                topAuto:this.componentData.styleConfig.top==='auto',
                rightAuto:this.componentData.styleConfig.right==='auto',
                bottomAuto:this.componentData.styleConfig.bottom==='auto',
                leftAuto:this.componentData.styleConfig.left==='auto',
            }
        },
        watch:{
            componentData:{
                deep:true,
                handler:function(newVal){
                    this.newComponentData= newVal
                }
            },
            newComponentData:{
                deep:true,
                handler:function(newVal){
                    this.$emit('input',newVal)
                }
            },
            topAuto:function (newV) {
                if(newV)this.newComponentData.styleConfig.top='auto'
            },
            rightAuto:function (newV) {
                if(newV)this.newComponentData.styleConfig.right='auto'
            },
            bottomAuto:function (newV) {
                if(newV)this.newComponentData.styleConfig.bottom='auto'
            },
            leftAuto:function (newV) {
                if(newV)this.newComponentData.styleConfig.left='auto'
            },
        },
    }
</script>

<style scoped>

</style>
