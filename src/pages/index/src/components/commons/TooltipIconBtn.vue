<template>
    <v-tooltip top :color="color">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on"
                   v-bind="attrs"
                   icon
                   x-small
                   :color="color"
                   @click.stop.prevent="clickEvent"
            >
                <v-icon size="12">{{icon}}</v-icon>
            </v-btn>
        </template>
        <span>{{tips}}</span>
    </v-tooltip>
</template>

<script>
    export default {
        name: "TooltipIconBtn",
        props:{
            tips:String,
            color:{
              default:'primary'
            },
            clickEvent:{
                type:Function,
                default:()=>{}
            },
            icon:String,
        }
    }
</script>

<style scoped>

</style>
