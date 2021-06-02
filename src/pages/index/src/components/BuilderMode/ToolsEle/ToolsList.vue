<template>
    <PlaceholderWrapper>
        <PlaceholderUl />
        <template v-slot:mask-content>
            <h5>List</h5>
        </template>
    </PlaceholderWrapper>
</template>

<script>
    import PlaceholderUl from "./tools-wedget/PlaceholderUl"
    import PlaceholderWrapper from "./tools-wedget/PlaceholderWrapper"
    export default {
        name: "ToolsList",
        components: {PlaceholderWrapper, PlaceholderUl}
    }
</script>

<style scoped>

</style>