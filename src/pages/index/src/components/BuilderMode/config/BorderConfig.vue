<template>
    <div class="row">
        <slot name="border-config"></slot>
        <div class="col-12">
            <label>Border width</label>
            <div class="row">
                <CommonInputConfig class="col-6 col-lg-3"
                                   :min="0"
                                   suffix="px"
                                   label="Top"
                                   v-model="newComponentData.styleConfig.borderTopWidth" />
                <CommonInputConfig class="col-6 col-lg-3"
                                   :min="0"
                                   suffix="px"
                                   label="Right"
                                   v-model="newComponentData.styleConfig.borderRightWidth" />
                <CommonInputConfig class="col-6 col-lg-3"
                                   :min="0"
                                   suffix="px"
                                   label="Bottom"
                                   v-model="newComponentData.styleConfig.borderBottomWidth" />
                <CommonInputConfig class="col-6 col-lg-3"
                                   :min="0"
                                   suffix="px"
                                   label="Left"
                                   v-model="newComponentData.styleConfig.borderLeftWidth" />
            </div>
        </div>
        <div class="col-12">
            <label>Border radius</label>
            <div class="row">
                <CommonInputConfig
                        class="col-6 col-lg-3"
                        :min="0"
                        suffix="px"
                        :id="newComponentData.id"
                        label="Top Left"
                        static-text="50%"
                        :show-static-text="isTopLeftCircleBorder"
                        v-model="newComponentData.styleConfig.borderTopLeftRadius"
                        css-type="borderTopLeftRadius"
                >
                    <v-checkbox
                            data-test="radius-top-left"
                            slot="header"
                            label="circle"
                            dense
                            hide-details
                            v-model="isTopLeftCircleBorder"
                    />
                </CommonInputConfig>

                <CommonInputConfig
                        class="col-6 col-lg-3"
                        :min="0"
                        suffix="px"
                        :id="newComponentData.id"
                        label="Top Left"
                        static-text="50%"
                        :show-static-text="isTopRightCircleBorder"
                        v-model="newComponentData.styleConfig.borderTopRightRadius"
                        css-type="borderTopRightRadius"
                >
                    <v-checkbox
                            data-test="radius-top-right"
                            slot="header"
                            label="circle"
                            dense
                            hide-details
                            v-model="isTopRightCircleBorder"
                    />
                </CommonInputConfig>

                <CommonInputConfig
                        class="col-6 col-lg-3"
                        :min="0"
                        suffix="px"
                        :id="newComponentData.id"
                        label="Bottom Right"
                        static-text="50%"
                        :show-static-text="isBottomRightCircleBorder"
                        v-model="newComponentData.styleConfig.borderBottomRightRadius"
                        css-type="borderBottomRightRadius"
                >
                    <v-checkbox
                            data-test="radius-bottom-right"
                            slot="header"
                            label="circle"
                            dense
                            hide-details
                            v-model="isBottomRightCircleBorder"
                    />
                </CommonInputConfig>

                <CommonInputConfig
                        class="col-6 col-lg-3"
                        :min="0"
                        suffix="px"
                        :id="newComponentData.id"
                        label="Bottom Left"
                        static-text="50%"
                        :show-static-text="isBottomLeftCircleBorder"
                        v-model="newComponentData.styleConfig.borderBottomLeftRadius"
                        css-type="borderBottomLeftRadius"
                >
                    <v-checkbox
                            data-test="radius-bottom-left"
                            slot="header"
                            label="circle"
                            dense
                            hide-details
                            v-model="isBottomLeftCircleBorder"
                    />
                </CommonInputConfig>
            </div>
        </div>



        <CommonColorConfig class="col-12 col-md-6"
                           :uid="'border-color-'+newComponentData.id"
                           label="Border color"
                           v-model="newComponentData.styleConfig.borderColor"
        />

        <div class="col-12 col-md-4">
            <label>Border style</label>
            <v-select
                    :items="borderStyleList"
                    v-model="newComponentData.styleConfig.borderStyle"
                    dense
                    hide-details>
            </v-select>
        </div>
    </div>
</template>

<script>
    import ColSizeConfig from "./components/ColSizeConfig"
    import CommonInputConfig from "./components/CommonInputConfig"
    import CommonColorConfig from "./components/CommonColorConfig"
    import CommonSelectConfig from "./components/CommonSelectConfig"

    export default {
        name: "BorderConfig",
        components: {CommonSelectConfig, CommonColorConfig, CommonInputConfig, ColSizeConfig},
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
                isTopLeftCircleBorder:this.componentData.styleConfig.borderTopLeftRadius==='50%',
                isTopRightCircleBorder:this.componentData.styleConfig.borderTopRightRadius==='50%',
                isBottomRightCircleBorder:this.componentData.styleConfig.borderBottomRightRadius==='50%',
                isBottomLeftCircleBorder:this.componentData.styleConfig.borderBottomLeftRadius==='50%',
                borderStyleList:[
                    'solid',
                    'dashed',
                    'none'
                ],
            }
        },
        watch:{
            componentData:{
                deep:true,
                handler:function(newVal){
                    this.newComponentData= newVal
                }
            },
            newComponentData:function(newVal){
                this.$emit('input',newVal)
            },
            isTopLeftCircleBorder(newV){
                if(newV)this.newComponentData.styleConfig.borderTopLeftRadius='50%'
            },
            isTopRightCircleBorder(newV){
                if(newV)this.newComponentData.styleConfig.borderTopRightRadius='50%'
            },
            isBottomRightCircleBorder(newV){
                if(newV)this.newComponentData.styleConfig.borderBottomRightRadius='50%'
            },
            isBottomLeftCircleBorder(newV){
                if(newV)this.newComponentData.styleConfig.borderBottomLeftRadius='50%'
            },
        },
    }
</script>

<style scoped>

</style>
