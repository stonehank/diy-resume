<template>

</template>

<script>
    import introJs from "intro.js";
    import 'intro.js/introjs.css'
    import {__getFromCacheLightweight, __setCacheLightweight} from "../../utils/cacheControl";

    export default {
        name: "HighlightTutorial",
        props: {
            pageId: String,
            steps: Array,
            closed:Function,
        },
        data() {
            return {
                cookieName: 'diy-resume-tutor-' + this.pageId,
                intro: null,
                prevScrTop: null,
                filterSteps:this.steps,
            }
        },
        mounted() {
            this.start()
        },
        methods: {
            start(){
                $(document).ready(()=>{
                    console.log(0)
                    if (!this.checkNeedShowTutor()) return
                    console.log(1)
                    __setCacheLightweight(this.cookieName, true)
                    this.filterTheInvalid()
                    this.intro = introJs().setOptions({
                        exitOnOverlayClick:false,
                        showBullets:true,
                        steps: this.filterSteps,
                        nextLabel:'Next',
                        prevLabel:'Back',
                        doneLabel:'Done',
                    })
                    .start()
                    .onbeforechange(() => {
                        let index = this.intro.currentStep()
                        console.log('before',index)
                        this.getRealScrollTop()
                        if(this.filterSteps[index].before){
                            this.filterSteps[index].before()
                        }
                    })
                    .onafterchange(() => {
                        let index = this.intro.currentStep()
                        this.detectNeedScrollRefresh(index)
                        console.log('after',index)
                        if(this.filterSteps[index].after){
                            this.filterSteps[index].after()
                            // console.log('after')
                        }
                    })
                    .onexit(() => {
                        if (this.prevScrTop != null) {
                            window.scrollTo({
                                behavior: "smooth",
                                top: this.prevScrTop
                            })
                            this.prevScrTop = null
                        }
                        if(this.closed)this.closed()
                    })
                    window.intro=this.intro
                    this.detectNeedScrollRefresh(0)
                })
            },
            getRealScrollTop(){
                if (this.prevScrTop != null)return
                // console.log(this.$route)
                if(this.$route.hash){
                    let $hashEle=$(this.$route.hash)
                    if($hashEle.length===0){
                        this.prevScrTop=0
                        return
                    }
                    this.prevScrTop = $hashEle.offset().top - $('.navbar').outerHeight(true)
                }else{
                    this.prevScrTop = 0
                }
            },
            filterTheInvalid(){
                this.filterSteps=this.steps.filter(obj=>$(obj.element).length>0)
            },
            checkNeedShowTutor() {
                // return true
                return !__getFromCacheLightweight(this.cookieName);
            },
            detectNeedScrollRefresh(index) {
                if(this.filterSteps.length===0)return
                if (this.filterSteps[index].scrollTo != null) {
                    setTimeout(() => {
                        let documentBody = document.documentElement || document.body
                        documentBody.scrollTop = this.filterSteps[index].scrollTo
                        this.intro.refresh()
                        console.log('scroll')
                    }, 1000)
                }
            }
        }
    }
</script>

<style scoped>

</style>
