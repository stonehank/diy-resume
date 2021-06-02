<template>
    <div>
        <label>Height</label>
        <div class="mt-2 row">
            <v-text-field v-if="showValue"
                          dense
                          label="Type a number"
                          hide-details
                          class="col-7"
                          type="number"
                          v-model="valueData">

            </v-text-field>
            <v-select class="col-5"
                      dense
                      label="Select type"
                      v-model="selectData"
                      :items="selectType"
                      hide-details>

            </v-select>
        </div>

    </div>
</template>

<script>
export default {
    name: "HeightConfig",
    props:{
        configData:String
    },
    model:{
        prop:'configData',
        event:'input'
    },
    data(){
        return{
            selectType:['auto','px','%'],
            newConfigData:this.configData,
            selectData:null,
            valueData:100,
            showValue:false,
        }
    },
    mounted(){
        if(!this.configData || this.configData === 'auto'){
            this.selectData='auto'
            this.showValue=false
        }else{
            this.showValue=true
            this.valueData=parseFloat(this.configData)
            if(this.configData.endsWith('px')){
                this.selectData='px'
            }else{
                this.selectData='%'
            }
        }
    },
    watch:{
        valueData(newV){
            this.newConfigData=newV+''+this.selectData
        },
        selectData(newV){
            if(newV==='auto'){
                this.showValue=false
                this.newConfigData='auto'
            } else{
                this.showValue=true
                this.newConfigData=this.valueData+''+newV
            }

        },
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
