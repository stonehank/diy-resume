<template>
    <main class="diy-wrapper">
        <v-app >
            <transition name="fade">
                <router-view style="transition:.5s;" ></router-view>
            </transition>
            <div id="taskInfoModalWrap"></div>
            <div id="hidden-page"></div>
            <v-alert
                    style="position:fixed;bottom:8px;width:100%;max-width:600px;z-index:99;left:50%;transform:translateX(-50%);"
                    border="top"
                    elevation="2"
                    colored-border
                    type="info"
                    :value="showCookieInfo"
            >
                <h4>Important notes:</h4>
                <small>No backend, no data transfer, use <b>{{useIdxDB ? 'IndexedDB' : useLocalStorage ? 'LocalStorage' : 'Cookie'}}</b> to save your personal information only make convenience for the edit.</small>
                <v-divider class="my-2"></v-divider>
                <v-btn @click="showCookieInfo=false" small color="info">Noted</v-btn>
            </v-alert>
        </v-app>
    </main>
</template>

<script>
    import {getFromCache,setCache} from './utils/cacheControl'
    import {COOKIE_INFO_SHOW} from './utils/CONSTANT'
    export default {
        name: "Main",
        props:["curLang"],
        data(){
            return {
                useIdxDB:!!window.indexedDB,
                useLocalStorage:!!window.localStorage,
                showCookieInfo:false,
            }
        },
        mounted(){
            getFromCache(COOKIE_INFO_SHOW).then((show)=>{
                if(show==null){
                    show=true
                }
                this.showCookieInfo=show
                if(show){
                    setCache(COOKIE_INFO_SHOW,false)
                }
            })
        },
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
