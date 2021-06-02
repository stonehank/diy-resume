<template>
    <ul class="tools-ul">
        <li class="tools-li" :style="`width:60%;height:${height}px;line-height:${height}px;`"></li>
        <li class="tools-li" :style="`width:90%;height:${height}px;line-height:${height}px;`"></li>
        <li class="tools-li" :style="`width:50%;height:${height}px;line-height:${height}px;`"></li>
    </ul>
</template>

<script>
    export default {
        name: "PlaceholderUl",
        data(){
            return {
                height:12
            }
        }
    }
</script>

<style scoped>
    .tools-ul{
        list-style:disc;
        width:100%;
        padding-left:20px;
        margin-bottom:4px;
    }
    .tools-li{
        list-style: disc;
        background: #e0e0e0;
        line-height: 12px;
        height:12px;
        margin: 4px 0;
        border-radius: 6px;
        font-size: 12px;
    }
</style>