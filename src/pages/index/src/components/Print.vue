<template>

</template>

<script>
    export default {
        name: "Print",
        mounted() {
            if(this.$route.params && this.$route.params.data_exist){
                setTimeout(()=>{
                    window.print()
                },1000)
            }

        }
    }
</script>

<style scoped>

</style>
