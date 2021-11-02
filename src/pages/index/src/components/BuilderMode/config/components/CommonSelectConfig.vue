<template>
    <div class="d-flex flex-column align-start">
        <label>{{label}}</label>
        <slot name="header"></slot>
        <v-btn text v-if="showStaticText" small>
            {{newConfigData}}
        </v-btn>
        <v-select
                v-else
                :items="items"
                v-model="newConfigData"
                dense
                hide-details>
        </v-select>
<!--        <div class="d-flex align-center justify-space-between">-->
<!--            <label>{{label}}</label>-->
<!--            <slot name="header"></slot>-->
<!--        </div>-->
<!--        <div>-->
<!--            <v-btn text v-if="showStaticText" small>-->
<!--                {{newConfigData}}-->
<!--            </v-btn>-->
<!--            <v-select-->
<!--                    v-else-->
<!--                    :items="items"-->
<!--                    v-model="newConfigData"-->
<!--                    dense-->
<!--                    hide-details>-->
<!--            </v-select>-->
<!--        </div>-->
    </div>
</template>

<script>
export default {
    name: "CommonSelectConfig",
    props:{
        configData:[Number,String],
        label:String,
        uid:String,
        id:String,
        cssType:String,
        items:Array,
        staticText:{
            default:'inherit'
        },
        showStaticText:{
            default:false
        },
    },
    mounted(){
    },
    model:{
        prop:'configData',
        event:'input'
    },
    data(){
        return{
            oldData:this.showStaticText ? $('#'+this.id).css(this.cssType) : this.configData,
            newConfigData:this.configData,
        }
    },
    watch:{
        showStaticText(newV){
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
