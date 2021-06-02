<template>
    <PlaceholderWrapper class="row" >
        <PlaceholderTag class="col-2" />
        <PlaceholderTag class="col-3" />
        <PlaceholderTag class="col-2" />
        <template v-slot:mask-content>
            <h5>Tag</h5>
        </template>
    </PlaceholderWrapper>
</template>

<script>
    import PlaceholderWrapper from "./tools-wedget/PlaceholderWrapper"
    import PlaceholderTag from "./tools-wedget/PlaceholderTag"
    export default {
        name: "ToolsTag",
        components: {PlaceholderTag, PlaceholderWrapper}
    }
</script>

<style scoped>

</style>