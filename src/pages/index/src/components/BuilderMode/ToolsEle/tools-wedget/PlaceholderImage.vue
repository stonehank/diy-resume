<template>

    <div class="tools-image" :style="`width:100%;height:64px;text-align:center;`">
        <img style="width:64px;height:64px;" :src="require('imagesDir/avatar.jpg')" />
    </div>
</template>

<script>
    export default {
        name: "PlaceholderImage",
        props:{
            size:{
                default:64
            }
        }
    }
</script>

<style scoped>
    .tools-image{
        background: #e0e0e0;
        margin: 2px 0;
        border-radius: 6px;
    }
</style>
