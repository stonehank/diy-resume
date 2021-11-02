<template>
    <div>
        <div class="d-flex align-center justify-space-between">
            <label>{{label}}</label>
            <slot name="header"></slot>
        </div>
        <div>
            <v-btn text v-if="showStaticText" small>
                {{newConfigData}}
            </v-btn>
            <v-color-picker
                    v-else
                    :value="newConfigData"
                    @update:color="color=>this.newConfigData=color.hexa"
                    mode="hexa"
                    flat
            ></v-color-picker>
<!--            <v-btn-->
<!--                    v-else-->
<!--                    :color="newConfigData"-->
<!--                    @click="showColorPicker"-->
<!--            >-->
<!--            </v-btn>-->
        </div>
<!--        <modal :name="uid"-->
<!--               :ref="uid"-->
<!--               width="280"-->
<!--               :adaptive="true"-->
<!--               height="auto"-->
<!--               :scrollable="true"-->
<!--        >-->
<!--            <v-color-picker-->
<!--                    v-model="newConfigData"-->
<!--                    flat-->
<!--            ></v-color-picker>-->
<!--        </modal>-->
    </div>
</template>

<script>
export default {
    name: "CommonColorConfig",
    props:{
        configData:[Number,String],
        label:String,
        uid:String,
        id:String,
        cssType:String,
        staticText:{
            default:"inherit"
        },
        showStaticText:{
            default:false
        },
    },
    mounted(){
        // document.getElementById('taskInfoModalWrap').appendChild(this.$refs[this.uid].$el)
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
    methods:{
        // showColorPicker(){
        //     this.$modal.show(this.uid)
        // },
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
