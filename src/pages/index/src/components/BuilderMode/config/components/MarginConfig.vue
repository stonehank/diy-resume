<template>
    <div>
        <label>Margin</label>
        <div style="width:100%" class="d-flex justify-space-between align-center">
            <div class="ma-4 md-width"
                 v-for="(label,index) in labels"
                 :key="index">
                <v-text-field dense :label="label" v-model="newConfigData[index]" hide-details type="number" :min="0" suffix="px"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MarginConfig",
    props:{
        configData:Array
    },
    model:{
        prop:'configData',
        event:'input'
    },
    data(){
        return{
            newConfigData:this.configData,
            labels:['Top','Right','Bottom','Left']
        }
    },
    watch:{
        configData:{
            deep:true,
            handler:function(newVal){
                this.newConfigData=newVal
            }
        },
        newConfigData:function(newVal){
            this.$emit('input',newVal)
        },
    },
}
</script>

<style scoped>

</style>
