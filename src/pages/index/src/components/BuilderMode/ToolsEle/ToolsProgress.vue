<template>
    <PlaceholderWrapper>
        <PlaceholderParagraph :col="3" />
        <PlaceholderProgress :col="9" />
        <template v-slot:mask-content>
            <h5>Progress</h5>
        </template>
    </PlaceholderWrapper>
</template>

<script>
    import PlaceholderWrapper from "./tools-wedget/PlaceholderWrapper"
    import PlaceholderParagraph from "./tools-wedget/PlaceholderParagraph"
    import PlaceholderProgress from "./tools-wedget/PlaceholderProgress"
    export default {
        name: "ToolsProgress",
        components: {PlaceholderProgress, PlaceholderParagraph, PlaceholderWrapper}
    }
</script>

<style scoped>

</style>