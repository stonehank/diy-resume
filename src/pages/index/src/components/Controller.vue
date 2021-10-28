<template>
    <v-app-bar
            data-test="nav-header"
            id="nav-header"
            fixed
            width="100%"
            class="control-bar"
            dense
            height="auto"
    >
        <Navigation />
        <v-select style="max-width:250px;"
                  class="tutorial-font-select"
                  dense
                  hide-details
                  outlined
                  label="Choose font"
                  item-value="val"
                  item-text="name"
                  :items="familyList"
                  v-model="curSelectFamily"
        />
        <slot></slot>
    </v-app-bar>
</template>

<script>
    import Navigation from "./Navigation"
    import {setFont} from '../utils/fontControl'
    export default {
        name: "Controller",
        components: {Navigation},
        data(){
            return {
                curSelectFamily:null,
                familyList:[
                    {name:'方正宋刻',val:'fangzheng-songke'},
                    {name:'罗西钢笔行楷',val:'gangbi-kaiti'},
                    {name:'胡晓波美心',val:'huxiaobo-meixin'},
                    {name:'AnonymousPro',val:'AnonymousPro-Regular'},
                    {name:'monaco',val:'monaco'},
                    {name:'Arial',val:'Arial'},
                ]
            }
        },
        watch:{
            curSelectFamily(newV,oldV){
                if(newV===oldV)return
                setFont(newV).then(()=>{
                    this.changeFontFamily(newV)
                })
            },
        },
        mounted(){
            this.curSelectFamily='fangzheng-songke'
        },
        methods:{
            changeFontFamily(family){
                // $('body,.v-application').css('font-family',`${family}`)
                $('.diy-export-wrapper, #page, #preview-export').css('font-family',`${family}`)
            },
        }
    }
</script>

<style scoped>

</style>
