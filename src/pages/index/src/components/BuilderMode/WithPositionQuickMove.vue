<template>
    <div class="transition-wrapper" :ref="'move-handler-'+newComponentData.id">
        <i class="transition-icon fas fa-arrows-alt" ></i>
    </div>
</template>

<script>

    export default {
        name: "WithPositionQuickMove",
        props:{
            index:Number,
            componentData:Object,
            updateComponentData:Function,
        },
        // computed:{
        //     throttleMousemove:()=>this.throttle(this.onMousemove,60)
        // },
        data(){
            return{
                throttleMousemove:this.throttle(this.onMousemove,50),
                newComponentData:this.componentData,
                startDrag:false,
                startX:0,
                startY:0,
                downX:null,
                downY:null,
            }
        },
        mounted(){
            let $ele=$(this.$refs['move-handler-'+this.newComponentData.id])
            if($ele.length===0)return
            // fetch from real DOM to calculate the value when is 'auto'
            let $moveEle=$('#'+this.newComponentData.id)
            let [top,right,bottom,left]=this.calcGap($moveEle)
            console.log([top,right,bottom,left])
            this.startX=left
            this.startY=top
            $ele.on('mousedown',this.onMousedown)
            $(document).on('mouseup',this.onMouseup)
        },
        watch: {
            componentData: {
                deep: true,
                handler: function (newVal) {
                    this.newComponentData = newVal
                }
            },
        },
        destroyed() {
            $(this.$refs['move-handler-'+this.newComponentData.id]).off('mousedown',this.onMousedown)
            $(document).off('mouseup',this.onMouseup)
            $(document).off('mousemove',this.throttleMousemove)
        },
        methods:{
            calcGap($ele){
                let top=$ele.css('top')
                let right=$ele.css('right')
                let bottom=$ele.css('bottom')
                let left=$ele.css('left')
                return [parseFloat(top),parseFloat(right),parseFloat(bottom),parseFloat(left)]
                // return [
                //     componentData.styleConfig.top,
                //     componentData.styleConfig.right,
                //     componentData.styleConfig.bottom,
                //     componentData.styleConfig.left,
                // ]
            },
            throttle(callback, interval) {
                let enableCall = true;
                return function(...args) {
                    if (!enableCall) return;

                    enableCall = false;
                    callback.apply(this, args);
                    setTimeout(() => enableCall = true, interval);
                }
            },
            onMousedown(ev){
                ev.stopPropagation()
                ev.preventDefault()
                console.log('mousedown')
                this.startDrag=true
                this.downX=ev.clientX
                this.downY=ev.clientY
                console.log('down:',this.downX,this.downY)
                $(document).on('mousemove',this.throttleMousemove)
            },
            onMousemove(ev){
                ev.stopPropagation()
                ev.preventDefault()
                console.log('mousemove',this.startDrag)
                if(!this.startDrag)return
                let dx=ev.clientX-this.downX
                let dy=ev.clientY-this.downY
                this.newComponentData.styleConfig.top=this.startY+dy
                this.newComponentData.styleConfig.left=this.startX+dx
            },
            // throttleMousemove:this.throttle(this.onMousemove,60),

            onMouseup(ev){
                // ev.stopPropagation()
                // ev.preventDefault()
                // console.log('mouseup')
                // console.log(ev.target)
                // if($(ev.target).parents('#'+this.newComponentData.id).length===0)return
                if(!this.startDrag)return
                this.startDrag=false
                $(document).off('mousemove',this.throttleMousemove)
                let endX=ev.clientX-this.downX
                let endY=ev.clientY-this.downY
                console.log('up:',endX,endY,this.downX,this.downY)
                this.startX+=endX
                this.startY+=endY
                this.downX=null
                this.downY=null
                this.newComponentData.styleConfig.top=this.startY
                this.newComponentData.styleConfig.left=this.startX
                this.updateComponentData(this.index,this.newComponentData)
            }
        }

    }
</script>

<style scoped>
    .transition-wrapper{
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border: 1px dashed var(--text-muted);
        opacity: 0.8;
        background: #fff;
        border-radius: 8px;
        z-index:10;
    }
    .transition-icon{
        font-size: 16px;
        position: absolute;
        color: var(--info-color);
        left: 0;
        top: 0;
        transform: translate(100%, 100%);
    }
</style>
