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
        <v-select style="max-width:250px;" dense hide-details outlined label="Choose font"
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
                familyList:['AnonymousPro-Regular','Arial','Cormorant-Regular','Itim-Regular','monaco','Roboto-Regular']
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
            this.curSelectFamily='Arial'
        },
        methods:{
            changeFontFamily(family){
                $('body,.v-application').css('font-family',`${family}`)
            },
        }
    }
</script>

<style scoped>

</style>
