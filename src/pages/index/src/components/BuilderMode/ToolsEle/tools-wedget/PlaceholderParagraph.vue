<template>
    <div class="tools-paragraph" :style="`width:${col*8.333}%;height:${height}px;line-height:${height}px;`"></div>
</template>

<script>
    export default {
        name: "PlaceholderParagraph",
        props:{
            col:{
                default:5,
            },
            height:{
                default:12
            }
        }
    }
</script>

<style scoped>
    .tools-paragraph{
        background: #e0e0e0;
        margin: 2px 0;
        border-radius: 6px;
    }
</style>