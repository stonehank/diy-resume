<template>
    <section class="section-with-appbar">
        <transition name="fade">
            <router-view  style="transition:.5s;" ></router-view>
        </transition>
    </section>
</template>

<script>
    export default {
        name: "DIY",
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
