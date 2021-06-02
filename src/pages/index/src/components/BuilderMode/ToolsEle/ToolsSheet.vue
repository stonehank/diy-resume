<template>
    <PlaceholderWrapper>
        <PlaceholderParagraph :col=4 :height="6" />
        <PlaceholderParagraph :col=9 :height="6"/>
        <PlaceholderParagraph :col=2 :height="6"/>
        <PlaceholderParagraph :col=7 :height="6"/>
        <PlaceholderParagraph :col=4 :height="6"/>
        <PlaceholderParagraph :col=12 :height="6"/>
        <PlaceholderParagraph :col=9 :height="6"/>
        <template v-slot:mask-content>
            <h5>Empty Page</h5>
        </template>
    </PlaceholderWrapper>
</template>

<script>
    import PlaceholderWrapper from "./tools-wedget/PlaceholderWrapper"
    import PlaceholderParagraph from "./tools-wedget/PlaceholderParagraph"
    export default {
        name: "ToolsSheet",
        components: {PlaceholderParagraph, PlaceholderWrapper}
    }
</script>

<style scoped>

</style>