<template>
    <div class="d-flex flex-column align-start">
        <label>{{label}}</label>
        <slot name="header"></slot>
<!--        <div class="d-flex align-center justify-space-between">-->
<!--          -->
<!--        </div>-->
        <v-btn text v-if="showStaticText" small>
            {{newConfigData}}
        </v-btn>
        <v-text-field
                v-else
                type="number"
                :min="min"
                :class="size+'-width'"
                dense
                hide-details
                v-model="newConfigData"
                v-bind="$attrs"
        ></v-text-field>
    </div>
</template>

<script>
export default {
    name: "CommonInputConfig",
    props:{
        configData:[Number,String],
        label:String,
        min:{
            default:16
        },
        size:{
            default:'md'
        },
        staticText:{
            default:"inherit"
        },
        showStaticText:{
            default:false
        },
        id:String,
        cssType:String,
    },
    model:{
        prop:'configData',
        event:'input'
    },
    data(){
        let oldVal=this.configData
        if(this.showStaticText){
            oldVal=parseFloat($('#'+this.id).css(this.cssType))
            oldVal=Number.isNaN(oldVal) ? 0 : oldVal
        }
        return{
            oldData:oldVal,
            newConfigData:this.configData,
        }
    },
    watch:{
        showStaticText(newV){
            // console.log(newV,this.oldData,this.staticText)
            if(newV){
                this.oldData=this.newConfigData
                this.newConfigData=this.staticText
            }else{
                this.newConfigData=this.oldData
                this.oldData=null
            }
        },
        configData:{
            deep:true,
            handler:function(newVal){
                this.newConfigData= newVal
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
