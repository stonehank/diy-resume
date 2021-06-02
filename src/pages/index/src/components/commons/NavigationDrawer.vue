<template>
    <v-navigation-drawer
            width="100%"
            :ref="uid"
            temporary
            touchless
            v-model="newDrawerShow"
            v-bind="$attrs"
    >
        <slot v-if="newDrawerShow"></slot>
    </v-navigation-drawer>
</template>

<script>
    import {v4 as uuidv4} from "uuid"
    export default {
        name: "NavigationDrawer",
        props:{
            drawerShow:Boolean,
        },
        model:{
            prop:'drawerShow',
            event:'input'
        },
        data(){
            return{
                uid:uuidv4(),
                newDrawerShow:this.drawerShow,
            }
        },
        watch:{
            drawerShow:{
                deep:true,
                handler:function(newVal){
                    this.newDrawerShow=newVal
                }
            },
            newDrawerShow:function(newVal){
                this.$emit('input',newVal)
            }
        },
        mounted(){
            if(document.getElementById('taskInfoModalWrap'))
            document.getElementById('taskInfoModalWrap').appendChild(this.$refs[this.uid].$el)
        }
    }
</script>

<style scoped>

</style>
