<template>
    <PlaceholderWrapper>
        <PlaceholderParagraph :col="12" />
        <PlaceholderParagraph :col="3" />
        <template v-slot:mask-content>
            <h5>Paragraph</h5>
        </template>
    </PlaceholderWrapper>
</template>

<script>
    import PlaceholderWrapper from "./tools-wedget/PlaceholderWrapper"
    import PlaceholderParagraph from "./tools-wedget/PlaceholderParagraph"
    export default {
        name: "ToolsParagraph",
        components: {PlaceholderParagraph, PlaceholderWrapper}
    }
</script>

<style scoped>

</style>