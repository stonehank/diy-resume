<template>
    <ExpansionWithDate v-model="newWithDateObj">
        <template v-slot:header>
            <v-col cols="12"
                   class="text--secondary py-1"
                   style="font-size:18px;">
                {{newWithDateObj.label || 'Show your skills'}}
                <span v-if="newWithDateObj.label" style="font-size:14px;">{{newWithDateObj.value ? 'Points: '+newWithDateObj.value : ''}}</span>
            </v-col>
        </template>
        <template v-slot:actions>
            <slot name="actions"></slot>
        </template>
        <template v-slot:body>
            <v-col cols="4">
                <v-text-field
                        filled
                        label="Skill Name"
                        v-model="newWithDateObj.label"
                >

                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-slider
                        label="Skill points"
                        v-model="newWithDateObj.value"
                ></v-slider>
            </v-col>
        </template>
    </ExpansionWithDate>
</template>

<script>
    import ExpansionWithDate from "./ExpansionWithDate"
    export default {
        name: "ExpansionWithSkills",
        components: {ExpansionWithDate},
        props:{
            withDateObj:Object,

        },
        model:{
            prop:'withDateObj',
            event:'input'
        },
        data(){
            return{
                newWithDateObj:this.withDateObj,
            }
        },
        watch: {
            withDateObj: {
                deep: true,
                handler: function (newVal) {
                    this.newWithDateObj = newVal
                }
            },
            newWithDateObj: {
                deep: true,
                handler: function (newVal) {
                    this.$emit('input', newVal)
                }
            },
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>