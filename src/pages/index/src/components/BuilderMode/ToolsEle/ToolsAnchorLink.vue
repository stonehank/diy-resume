<template>
    <PlaceholderWrapper>
        <PlaceholderParagraph :col="7" />
        <i class="pointer far fa-hand-point-up" />
        <template v-slot:mask-content>
            <h5>Anchor Link</h5>
        </template>
    </PlaceholderWrapper>
</template>

<script>
    import PlaceholderWrapper from "./tools-wedget/PlaceholderWrapper"
    import PlaceholderParagraph from "./tools-wedget/PlaceholderParagraph"
    export default {
        name: "ToolsAnchorLink",
        components: {PlaceholderParagraph, PlaceholderWrapper}
    }
</script>

<style scoped>
    .pointer{
        position: absolute;
        top: 10px;
        left: 50px;
        color: var(--text-muted);
        opacity: 1;
        font-size: 18px;
    }
</style>