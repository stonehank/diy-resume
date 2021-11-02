<template>
    <component
            v-if="!loading"
            :is="SvgComponent"
            ref="generate-svg-icon"
            :style="{
                fill:this.fontColor,
                height:this.fontSize,
                marginBottom:'-2px'
            }"
    ></component>
</template>

<script>
    import svgToPng from "../../utils/svg-to-png"

    export default {
        name: "GenerateSVGIcon",
        props:{
            icon:String,
            styleConfig:Object,
        },
        data(){
            return {
                loading:true,
                SvgComponent:null,
                fontSize:null,
                fontColor:null,
            }
        },
        watch:{
            icon:{
                immediate:true,
                handler(newV){
                    this.loading=true
                    console.log('icon change',newV)
                    let iconArr=newV.split(' ')
                    let dirPath=''
                    let first=iconArr[0], next=iconArr[1].slice('fa-'.length)
                    if(first==='fas'){
                        dirPath+='solid/'
                    }else if(first==='far'){
                        dirPath+='regular/'
                    }else if(first==='fab'){
                        dirPath+='brands/'
                    }
                    dirPath+=next+'.svg'
                    this.SvgComponent=require('assetsDir/fonts/svgs/'+dirPath)
                    this.loading=false
                }
            },
            styleConfig:{
                deep:true,
                handler(newV,oldV){
                    console.log('watch config')
                    let $ele=$(this.$refs['generate-svg-icon'])
                    if(!$ele)return
                    if(newV.fontSize!==oldV.fontSize){
                        this.fontSize=$ele.css('fontSize')
                    }
                    if(newV.color!==oldV.color){
                        this.fontColor=$ele.css('color')
                    }
                }
            }
        },
        mounted(){
            let $ele=$(this.$refs['generate-svg-icon'])
            this.fontColor=$ele.css('color')
            this.fontSize=$ele.css('fontSize')
        },
    }
</script>

<style scoped>

</style>
