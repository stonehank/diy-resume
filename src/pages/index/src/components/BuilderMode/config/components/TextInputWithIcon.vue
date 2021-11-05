<template>
    <div class="row col-12">
        <div class="col-12">
            <div class="d-flex align-center justify-start mb-2">
                <label>{{label}}</label>
                <v-checkbox
                        label="Icon"
                        dense
                        hide-details
                        v-model="newComponentData.config.icon"
                />
                <v-checkbox
                        label="Textarea"
                        dense
                        hide-details
                        v-model="newComponentData.config.textarea"
                />
            </div>
            <TextField
                    :textarea="newComponentData.config.textarea"
                    class="d-flex align-end"
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
            </TextField>
<!--            <v-text-field-->
<!--                    class="d-flex align-end"-->
<!--                    label="value"-->
<!--                    hide-details-->
<!--                    v-model="newComponentData.config.value"-->
<!--                    v-bind="$attrs"-->
<!--            >-->
<!--                <template v-if="newComponentData.config.icon" v-slot:prepend>-->
<!--                    <v-autocomplete-->
<!--                            style="width:80px;"-->
<!--                            v-model="newComponentData.config.prependIcon"-->
<!--                            :items="items"-->
<!--                            dense-->
<!--                            solo-->
<!--                            hide-details-->
<!--                            label="Icon"-->
<!--                    >-->
<!--                        <template v-slot:selection="{item}">-->
<!--                            <i :class="item"></i>-->
<!--                        </template>-->
<!--                        <template v-slot:item="{item}">-->
<!--                            <div class="d-flex align-center">-->
<!--                                <i :class="item" class="mr-1"></i>-->
<!--                                <span>{{item}}</span>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                    </v-autocomplete>-->
<!--                </template>-->
<!--                <template v-if="newComponentData.config.icon" v-slot:append-outer>-->
<!--                    <v-autocomplete-->
<!--                            style="width:80px;"-->
<!--                            v-model="newComponentData.config.appendIcon"-->
<!--                            :items="items"-->
<!--                            dense-->
<!--                            solo-->
<!--                            hide-details-->
<!--                            label="Icon"-->
<!--                    >-->
<!--                        <template v-slot:selection="{item}">-->
<!--                            <i :class="item"></i>-->
<!--                        </template>-->
<!--                        <template v-slot:item="{item}">-->
<!--                            <div class="d-flex align-center">-->
<!--                                <i :class="item" class="mr-1"></i>-->
<!--                                <span>{{item}}</span>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                    </v-autocomplete>-->
<!--                </template>-->

<!--            </v-text-field>-->
        </div>
    </div>
</template>

<script>
    import fontList from '../../../../utils/fontAwesomeList'
    import TextField from "./TextField"
    export default {
        name: "TextInputWithIcon",
        components: {TextField},
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
    ::v-deep .v-input__prepend-outer, ::v-deep .v-input__append-outer{
        margin-bottom:0 !important;
    }
</style>
