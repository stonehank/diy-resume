<template>

</template>

<script>
    import deepClone from "clone-deep"
    import { debounce } from "debounce";
    export default {
        name: "RenderTemplate",
        props:{
            level:Number,
            index:Number,
            componentData:Object,
            updateComponentData:Function,
            removeComponentData:Function,
            saveAsCustomTemplate:Function,
            textMode:Boolean,
            editable: {
                default:false
            },
        },
        watch:{
            // fix after dragging the position not change immediately
            componentData:{
                deep:true,
                handler(newV){
                    this.curData=deepClone(newV)
                }
            }
        },
        data(){
            return {
                drawerShow:false,
                curData:deepClone(this.componentData),
                configModalName:this.componentData.name+'_'+this.componentData.id+'_config_modal'
            }
        },
        mounted(){
            // if(this.editable) {
            //     document.getElementById('taskInfoModalWrap').appendChild(this.$refs[this.configModalName].$el)
            // }
        },
        computed:{
            mergeBorderWidth:function(){
                let t=this.curData.styleConfig.borderTopWidth
                let r=this.curData.styleConfig.borderRightWidth
                let b=this.curData.styleConfig.borderBottomWidth
                let l=this.curData.styleConfig.borderLeftWidth
                return t+'px' + ' '
                    + r+'px' + ' '
                    + b+'px' + ' '
                    + l+'px' + ' '
            },
            mergeBorderRadius:function(){
                let lt=this.componentData.styleConfig.borderTopLeftRadius
                let rt=this.componentData.styleConfig.borderTopRightRadius
                let rb=this.componentData.styleConfig.borderBottomRightRadius
                let lb=this.componentData.styleConfig.borderBottomLeftRadius
                return (lt==='50%' ? '50%' : lt+'px') + ' '
                    + (rt==='50%' ? '50%' : rt+'px') + ' '
                    + (rb==='50%' ? '50%' : rb+'px') + ' '
                    + (lb==='50%' ? '50%' : lb+'px') + ' '
            }
        },

        methods:{
            debounceUpdateData(){
                debounce(this.updateComponentData(this.curData),500)
            },
            showConfig(evt){
                // console.log(this.editable)
                if(!this.editable)return
                this.drawerShow=true
                // this.$modal.show(this.configModalName)
            },
            /** possible receive MouseEvent */
            hideConfig(skipRewrite=false){
                console.log(skipRewrite,this.componentData)
                if(skipRewrite!==true)this.curData=deepClone(this.componentData)
                this.drawerShow=false
                // this.$modal.hide(this.configModalName)
                if(this.afterClose)this.afterClose(this.curData)
            },
            saveConfig(){
                this.updateComponentData(this.curData)
                this.hideConfig(true)
            },
            afterClose(){},
            removeEle(){
                this.removeComponentData(this.index)
            },
            saveAsTemplate(){
                this.saveAsCustomTemplate(this.componentData)
            },
            updateDrawer(val){
                if(val===this.drawerShow)return
                if(val)this.showConfig()
                else this.hideConfig()
            }
        }
    }
</script>
