<template>
    <div class="diy-wrapper">
        <v-app>
            <transition name="fade">
                <router-view style="transition:.5s;" ></router-view>
            </transition>
            <div id="taskInfoModalWrap"></div>
            <div id="hidden-page"></div>
            <v-overlay :value="overlay">
                <v-progress-circular
                        indeterminate
                        size="48"
                ></v-progress-circular>
            </v-overlay>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "Main",
        provide() {
            return {
                triggerExportLoading: this.triggerExportLoading
            }
        },
        data(){
            return {
                overlay:false
            }
        },
        methods:{
            triggerExportLoading(){
                this.overlay=!this.overlay
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
