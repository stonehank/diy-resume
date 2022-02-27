<template>
    <v-menu
    >
        <template v-slot:activator="{attr, on }">
            <v-btn
                    :text="text"
                   v-bind="attr"
                   v-on="on"
            >
                Export
            </v-btn>
        </template>

        <v-list>
            <v-list-item
                    v-for="(item,index) in exportList"
                    :key="index"
                    @click="item.event"
                    :color="item.color"
            >
                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
            <slot></slot>
        </v-list>
    </v-menu>
</template>

<script>
    import html2canvas from "html2canvas"
    import {jsPDF} from "jspdf"
    import {getFont} from '../utils/fontControl'
    import svgToPng from "../utils/svg-to-png"

    export default {
        name: "Export",
        inject:['triggerExportLoading'],
        props:{
            text:{
                default:true
            }
        },
        data(){
            return {
                exportList:[
                    {name:'Export PDF',event:this.printPDF,color:''},
                    {name:'Export Image',event:this.printImage,color:''},
                    {name:'Window Print',event:this.windowPrint,color:'primary'},
                ]
            }
        },
        methods:{
            convertAllSvgToPng($ele){
                let promise=[]
                let $allEle=$ele.find('*')
                $allEle.each((i,ele)=>{
                    if(!ele instanceof SVGElement || ele.nodeName.toLowerCase()!=='svg')return
                    let parentNode=ele.parentNode
                    let curPro=svgToPng(ele.outerHTML)
                        .then((imgSrc)=>{
                            let img=new Image()
                            img.src=imgSrc
                            img.style.height=$(ele).css('height')
                            img.style.marginBottom='-2px'
                            parentNode.insertBefore(img,ele)
                            ele.remove()
                        })
                    promise.push(curPro)
                })
                return Promise.all(promise)
            },
            beforeExport(){
                // need to scroll to avoid blank, https://github.com/niklasvh/html2canvas/issues/2440#issuecomment-760386632
                window.scrollTo(0, 0)
                let $ele=$('#preview-export').clone(true,true)
                this.triggerExportLoading()
               return this.convertAllSvgToPng($ele)
                .then(()=>{
                    let $exportEle=$('<div class="diy-export-wrapper"></div>')
                    $exportEle.append($ele)
                    let curFont=$ele.css('font-family')
                    $ele.removeAttr('style')
                    $ele.css({
                        transform:'scale(1)',
                    })
                    $exportEle.css({
                        fontFamily:curFont,
                        position: 'fixed',
                        zIndex: -999,
                        left: 0,
                        top: 0,
                    })
                    $('.diy-wrapper').append($exportEle)
                    return $exportEle
                })
            },
            afterExport($exportEle){
                $exportEle.remove()
                this.triggerExportLoading()
            },
            windowPrint(){
                return this.beforeExport().then(($exportEle)=>{
                    this.triggerExportLoading()
                    this.$router.push({
                        name:'print',
                        params:{
                            data_exist:true
                        }
                    })
                })
            },
            printImage(){
                return this.beforeExport().then(($exportEle)=>{
                    let link = document.createElement('a');
                    link.download = `my-resume.jpg`; // downloadable resources renamed
                    setTimeout(()=>{
                        this.printCanvas($exportEle[0])
                            .then((base64)=>{
                                link.href = base64
                                link.click()
                                this.afterExport($exportEle)
                            })
                    },200)
                })

            },
            printCanvas(ele) {
                return html2canvas(ele, {
                    allowTaint: true,
                    scale: 2,
                }).then(function (canvas) {
                    return canvas.toDataURL('image/jpeg', 1.0)
                })
            },
            printPDF() {
                return this.beforeExport().then(($exportEle)=>{
                    let self=this
                    let doc = new jsPDF({
                        format:[Math.ceil($exportEle.outerWidth()),$exportEle.outerHeight()+1],
                    })
                    doc.setFont(getFont(),'normal');
                    doc.html($exportEle[0], {
                        callback: function (doc) {
                            doc.save('resume-download.pdf')
                            self.afterExport($exportEle)
                        },
                    })
                })
            },
        }
    }
</script>

<style scoped>

</style>
