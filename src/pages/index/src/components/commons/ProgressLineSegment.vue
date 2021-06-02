<template>
    <div class="progress-segment-wrapper">
        <div v-frag
             v-for="(_,index) in segmentCount"
             :key="index"
        >
            <div class="segment-item"   ref="segment-item" :style="{
                 // width: Math.trunc(100 / segmentCount) + '%',
                 height:height+'px'
             }">
                <div
                        class="segment-background" :style="{
                        backgroundColor:backgroundColor,
                        width:segmentModPercent>0 && index===segmentCount-1 ? segmentModPercent*100+'%' : '100%'
                    }"
                >
                    <div class="segment-value"
                         :style="{
                        backgroundColor:color,
                        width:valueFillList[index]
                    }">

                    </div>
                </div>
            </div>
            <div v-if="index!==segmentCount-1" class="gap" :style="{width:gapWidth+'%'}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressLineSegment",
        props:{
            value:[Number,String],
            bufferValue:[Number,String],
            color:String,
            backgroundColor:String,
            height:{
                type:[Number,String],
                default:8,
            },
            segmentWidth:{
                type:[Number,String],
                default:20
            },
        },
        computed:{
            segmentCount:function(){
                return Math.ceil(+this.bufferValue / Math.max(1,+this.segmentWidth))
            },
            segmentModPercent:function(){
                return +this.bufferValue % +this.segmentWidth / Math.max(1,+this.segmentWidth)
            },
            valueFillList:function () {
                let value=+this.value
                let segmentWidth=Math.max(1,+this.segmentWidth)
                let valueCount=Math.ceil(value / segmentWidth)
                let valueModPercent=value % segmentWidth / segmentWidth
                let valueList= Array(this.segmentCount).fill(0)
                for(let i=0;i<valueCount;i++){
                    if(i===valueCount-1){
                        if(valueModPercent>0){
                            valueList[i]=valueModPercent*100 + '%'
                            break
                        }
                    }
                    valueList[i]='100%'
                }
                return valueList
            },
            gapWidth: function(){
                return 100 / Math.ceil(+this.bufferValue / Math.max(1,+this.segmentWidth)) * 0.2
            }
        },
    }
</script>

<style scoped>
    .progress-segment-wrapper{
        width:100%;
        display:flex;
        align-items: center;
    }
    .segment-item{
        flex:1;
    }
    .gap{
        height:8px;
    }
    .segment-background,.segment-value{
        height:100%;
    }
</style>