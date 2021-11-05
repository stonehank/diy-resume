<template>
    <v-textarea
            v-if="textarea"
            :rows="rows"
            outlined
            v-bind="$attrs"
            v-on="$listeners"
    >
        <template v-slot:prepend>
            <slot name="prepend"></slot>
        </template>
        <template v-slot:append-outer>
            <slot name="append-outer"></slot>
        </template>
<!--        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">-->
<!--            <slot :name="slot" v-bind="scope"/>-->
<!--        </template>-->
    </v-textarea>
    <v-text-field
            v-else
            v-bind="$attrs"
            v-on="$listeners"
    >
        <template v-slot:prepend>
            <slot name="prepend"></slot>
        </template>
        <template v-slot:append-outer>
            <slot name="append-outer"></slot>
        </template>
<!--        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">-->
<!--            <slot :name="slot" v-bind="scope"/>-->
<!--        </template>-->
    </v-text-field>

</template>

<script>
    export default {
        name: "TextField",
        inheritAttrs:false,
        props:{
            textarea:Boolean,
            rows:{
                type:Number,
                default:5,
            }
        }
    }
</script>

<style scoped>

</style>
