<template>
    <div class="d-flex resume-diy-home">
        <v-card to="/diy/edit" flat tile class="flex-grow-1 resume-diy-builder"
                dark color="success">
            <div>
                <h1 class="display-1 pl-6">
                    <v-icon color="#fff">fas fa-user-edit</v-icon>
                    TextEdit Mode
                </h1>
                <v-stepper
                        :value="false"
                        style="background:transparent;"
                        flat
                        vertical
                >
                    <v-stepper-step step="1">Type to fill your personal information</v-stepper-step>
                    <v-stepper-content step="1"></v-stepper-content>

                    <v-stepper-step step="2">Choose a template</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>

                    <v-stepper-step step="3" complete>Export, well done!</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>
                </v-stepper>
            </div>
        </v-card>
        <v-card v-if="+$mq>=1260" to="/diy/builder" flat tile class="flex-grow-1 resume-diy-text"
                dark color="info"
        >
            <div>
                <h1 class="display-1 pl-6">
                    <v-icon color="#fff">fas fa-code</v-icon>
                    Builder Mode
                </h1>
                <v-stepper
                        :value="false"
                        style="background:transparent;"
                        flat
                        vertical
                >
                    <v-stepper-step step="1">Drag and Drop to build your resume</v-stepper-step>
                    <v-stepper-content step="1"></v-stepper-content>

                    <v-stepper-step step="2">Type the text, edit the sizing, position, style...</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>

                    <v-stepper-step step="3" complete>Export, well done!</v-stepper-step>
                    <v-stepper-content step="2"></v-stepper-content>
                </v-stepper>
            </div>
        </v-card>
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
    </div>
</template>

<script>
    // import {getFromCache,setCache} from './utils/cacheControl'
    // import {COOKIE_INFO_SHOW} from './utils/CONSTANT'
    export default {
        name: "Home",
        data(){
            return {
                useIdxDB:!!window.indexedDB,
                useLocalStorage:!!window.localStorage,
                showCookieInfo:false,
            }
        },
        mounted(){
            this.showCookieInfo=true
            // getFromCache(COOKIE_INFO_SHOW).then((show)=>{
            //     if(show==null){
            //         show=true
            //     }
            //     this.showCookieInfo=show
            //     if(show){
            //         setCache(COOKIE_INFO_SHOW,false)
            //     }
            // })
        },
    }
</script>

<style scoped>
    .resume-diy-builder{
        display:flex;
        flex-flow:column;
        align-items: center;
        justify-content: center;
    }
    .resume-diy-text{
        display:flex;
        flex-flow:column;
        align-items: center;
        justify-content: center;
    }
</style>
<style lang="scss">
    .resume-diy-home{
        height:100vh;
        .v-stepper__step > .v-stepper__step__step{
            font-size: 16px !important;
            color: #fff !important;
            background: var(--theme-secondary) !important;
            i{
                font-size: 16px !important;
            }
        }
        .v-stepper__step > .v-stepper__label{
            color:#fff !important;
        }
    }

</style>
