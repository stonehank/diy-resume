<template>
    <div class="tools-item-wrapper">
        <div class="element-mask"></div>
        <div style="display:none" class="mask-content">
            <slot name="mask-content"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PlaceholderWrapper",
    }
</script>

<style scoped>
    .element-mask{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:#000;
        opacity:0;
        z-index: 1;
        transition:opacity 0.2s;
        border-radius: inherit;
    }
    .mask-content{
        color:#fff;
        position:absolute;
        opacity:1;
        z-index: 2;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .on-tools-hover{
        opacity:0.7 !important;
    }
    .tools-item-wrapper{
        background:#fff;
        width:100%;
        margin:8px 0;
        border-radius:4px;
        padding:6px;
        position:relative;
        cursor:pointer;
    }
</style>
