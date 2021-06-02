<template>
    <div>
        <label>Col Size</label>
        <v-select :height="26" class="md-width" dense v-model="newConfigData" :items="colItems" hide-details></v-select>
    </div>
</template>

<script>
export default {
    name: "ColSizeConfig",
    props:{
        items:Array,
        configData:{
            default:'auto'
        }
    },
    model:{
        prop:'configData',
        event:'input'
    },
    data(){
        return{
            colItems:['auto',1,2,3,4,5,6,7,8,9,10,11,12],
            newConfigData:this.configData,
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
.sm-with{
    width:80px;
}
    .font-size-28{
        font-size:28px;
        color:var(--text-secondary);
    }
</style>
