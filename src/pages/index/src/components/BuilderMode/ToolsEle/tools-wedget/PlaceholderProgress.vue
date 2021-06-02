<template>
    <div class="tools-progress">
        <p class="tools-progress-val" :style="`width:${col*8.333}%;`"></p>
    </div>
</template>

<script>
    export default {
        name: "PlaceholderProgress",
        props:{
            col:{
                default:5
            }
        }
    }
</script>

<style scoped>
    .tools-progress{
        width:100%;
        background: #a8a8a8;
        height:8px;
        margin: 2px 0;
        border-radius: 4px;
        position:relative;
    }
    .tools-progress-val{
        position:absolute;
        top:0;
        left:0;
        background: steelblue;
        height:8px;
        border-radius: 4px;
    }
</style>