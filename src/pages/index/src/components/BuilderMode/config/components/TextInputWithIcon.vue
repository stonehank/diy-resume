<template>
    <div class="row col-12">
        <div class="col-12">
            <div class="d-flex align-center justify-start">
                <label>{{label}}</label>
                <v-checkbox
                        label="Icon"
                        dense
                        hide-details
                        v-model="newComponentData.config.icon"
                />
            </div>
            <v-text-field
                    label="value"
                    hide-details
                    v-model="newComponentData.config.value"
                    v-bind="$attrs"
            >
                <template v-if="newComponentData.config.icon" v-slot:prepend>
                    <v-autocomplete
                            style="width:80px;"
                            v-model="newComponentData.config.prependIcon"
                            :items="items"
                            dense
                            solo
                            hide-details
                            label="Icon"
                    >
                        <template v-slot:selection="{item}">
                            <i :class="item"></i>
                        </template>
                        <template v-slot:item="{item}">
                            <div class="d-flex align-center">
                                <i :class="item" class="mr-1"></i>
                                <span>{{item}}</span>
                            </div>
                        </template>
                    </v-autocomplete>
                </template>
                <template v-if="newComponentData.config.icon" v-slot:append-outer>
                    <v-autocomplete
                            style="width:80px;"
                            v-model="newComponentData.config.appendIcon"
                            :items="items"
                            dense
                            solo
                            hide-details
                            label="Icon"
                    >
                        <template v-slot:selection="{item}">
                            <i :class="item"></i>
                        </template>
                        <template v-slot:item="{item}">
                            <div class="d-flex align-center">
                                <i :class="item" class="mr-1"></i>
                                <span>{{item}}</span>
                            </div>
                        </template>
                    </v-autocomplete>
                </template>

            </v-text-field>
        </div>
    </div>
</template>

<script>
    import fontList from 'jsDir/fontAwesomeList'
    export default {
        name: "TextInputWithIcon",
        props:{
            componentData:Object,
            label:String,
        },
        model:{
            prop:'componentData',
            event:'input'
        },
        data(){
            return{
                items:fontList,
                withIcon:false,
                newComponentData:this.componentData,
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
        },
    }
</script>

<style scoped>

</style>
