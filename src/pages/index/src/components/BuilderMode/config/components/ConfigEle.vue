<template>
    <v-card flat class="config-ele-wrapper">
        <v-card-title>
            <h5 class="modal-title">{{title.toUpperCase()}} CONFIG</h5>
<!--            <i class="fas fa-arrows-alt px-2"></i>-->
            <v-spacer></v-spacer>
            <CancelButton :click-event="hide_model"/>
        </v-card-title>
        <div class="pa-2" >
            <v-card-text>
                <v-tabs :height="30" v-model="tab" style="border-bottom:1px solid var(--text-blur);">
                    <v-tab>Config</v-tab>
                    <v-tab>Position Config</v-tab>
                    <v-tab>Border</v-tab>
                    <v-tab>Template</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <slot name="config"></slot>
                    </v-tab-item>
                    <v-tab-item>
                        <slot name="position_config"></slot>
                    </v-tab-item>
                    <v-tab-item>
                        <slot name="border_config"></slot>
                    </v-tab-item>
                    <v-tab-item>
                        <slot name="template_config"></slot>
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
    import CancelButton from "../../../commons/CancelButton";
    export default {
        name: "ConfigEle",
        components: {CancelButton},
        props:{
            title:String,
            hide_model:Function,
        },
        data(){
            return {
                tab:0,
            }
        },
    }
</script>


<style>
    .config-modal label:not(.custom-control-label){
        margin: 8px 0;
        background: var(--text-blur);
        padding: 6px 10px 6px 10px;
        border-radius: 4px;
        font-weight: 600;
    }
</style>
