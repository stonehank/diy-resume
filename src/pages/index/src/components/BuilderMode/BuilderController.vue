<template>
    <div v-frag>
        <v-checkbox class="ml-2 tutorial-build-mode-autosave" v-model="newAutoSave" @change="onChangeAutoSave" hide-details dense label="AutoSave"></v-checkbox>
        <v-checkbox data-test="quick-edit" class="mr-2 tutorial-build-mode-quick-edit" :value="textMode" hide-details dense label="Quick Edit" @change="toggleTextMode"></v-checkbox>
        <v-spacer></v-spacer>
        <div class="d-flex align-center justify-end">
            <v-btn class="mx-2 tutorial-build-mode-save-in-cache" color="primary" x-small @click="showSaveModal">Save in cache</v-btn>
            <v-btn class="mx-2 tutorial-build-mode-cache" x-small @click="showCacheList">
                Cache
                <v-icon x-small right>fas fa-cog</v-icon>
            </v-btn>
            <v-btn class="mx-2 tutorial-build-mode-import" color="info" x-small @click="importFile">Import a Data</v-btn>
            <input
                    type="file"
                    v-show="false"
                    ref="import_file"
                    @change="insertFile"
            />
            <div class="tutorial-build-mode-export">
                <Export >
                    <v-list-item @click="saveAsJSON">
                        <v-list-item-title>Export as JSON</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="saveAsTemplateJSON">
                        <v-list-item-title>Export as template JSON</v-list-item-title>
                    </v-list-item>
                </Export>
            </div>
        </div>
    </div>
</template>

<script>
    import Navigation from "../Navigation"
    import Controller from "../Controller"
    import Export from "../Export"

    export default {
        name: "BuilderController",
        components: {Export, Controller, Navigation},
        props:{
            autoSave:Boolean,
            textMode:Boolean,
            showCacheList:Function,
            showSaveModal:Function,
            toggleTextMode:Function,
            insertImport:Function,
            onChangeAutoSave:Function,
            saveAsTemplateJSON:Function,
            saveAsJSON:Function,
        },
        model:{
            prop:'autoSave',
            event:'input'
        },
        data(){
            return{
                newAutoSave:this.autoSave,

            }
        },
        watch:{
            newAutoSave:function(newVal){
                this.onChangeAutoSave(newVal)
            },
        },
        methods:{
            importFile(){
                // console.log(this.$refs)
                this.$refs.import_file.click()
            },
            insertFile(){
               this.insertImport(this.$refs.import_file.files[0])
            }
        }
    }
</script>

<style scoped>

</style>
