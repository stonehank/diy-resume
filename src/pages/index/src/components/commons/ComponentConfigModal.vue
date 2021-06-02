<template>
    <modal class="config-wrapper"
           :name="modalName"
           :ref="modalName"
           :adaptive="true"
           :clickToClose="false"
           height="auto"
           :scrollable="true"
           :draggable="draggableClass"

    >
        <slot></slot>
    </modal>
</template>

<script>
    export default {
        name: "ComponentConfigModal",
        props:{
            modalName:String,
            draggableClass:{
                default:'.modal-drag-handle'
            }
        },
        mounted(){
            if(document.getElementById('taskInfoModalWrap'))
            document.getElementById('taskInfoModalWrap').appendChild(this.$refs[this.modalName].$el)
        },
    }
</script>

<style scoped>

</style>
