<template>
    <PlaceholderWrapper >
        <PlaceholderImage />
        <template v-slot:mask-content>
            <h5>Image</h5>
        </template>
    </PlaceholderWrapper>
</template>

<script>
    import PlaceholderWrapper from "./tools-wedget/PlaceholderWrapper"
    import PlaceholderImage from "./tools-wedget/PlaceholderImage"
    export default {
        name: "ToolsImage",
        components: {PlaceholderImage, PlaceholderWrapper}
    }
</script>

<style scoped>

</style>