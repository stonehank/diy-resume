<template>
    <div v-frag>
        <v-spacer></v-spacer>
        <div style="position:relative;">
            <div v-if="+$mq >= 1264" class="d-flex align-center">
                <Export v-if="showExport" />
                <v-btn data-test="choose-template-btn" class="mr-2" color="success" small @click="showTemplateList">Choose a template</v-btn>
            </div>
            <v-menu
                    v-else
                    offset-y
            >
                <template v-slot:activator="{ attrs, on }">
                    <v-btn text
                           v-bind="attrs"
                           v-on="on"
                    >
                        Actions
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                            v-for="(item,index) in actionList"
                            :key="index"
                            @click="item.event"
                            :color="item.color"
                    >
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
    import Controller from "../Controller"
    import Export from "../Export"
    export default {
        name: "TextModeController",
        components: {Export, Controller},
        props:{
            showExport:Boolean,
            showTemplateList:Function,
            importFile:Function,
            showPreviewInMobile:Function,
        },
        data(){
            return {
                actionList:[
                    {name:'Preview',event:this.showPreviewInMobile},
                    {name:'Choose a template',event:this.showTemplateList,color:'primary'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>
