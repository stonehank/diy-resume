<template>

</template>

<script>

    export default {
        name: "PreviewTemplate",
        props:{
            index:Number,
            componentData:Object,
            editable:{
                default:false
            }
        },
        computed:{
            mergeBorderWidth:function(){
                let t=this.componentData.styleConfig.borderTopWidth
                let r=this.componentData.styleConfig.borderRightWidth
                let b=this.componentData.styleConfig.borderBottomWidth
                let l=this.componentData.styleConfig.borderLeftWidth
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
    }
</script>
