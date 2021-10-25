<template>
    <div class="row">
        <slot></slot>
        <div class="col-12 d-flex align-center">
            <label style="font-size:1.2rem">Slug</label>
        </div>
        <div class="col-12 d-flex align-center">
            <v-text-field data-test="slot-input" outlined dense hide-details v-model="newComponentData.template_slug" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "TemplateConfig",
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
