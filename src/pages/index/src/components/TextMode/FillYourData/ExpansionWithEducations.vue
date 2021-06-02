<template>
    <ExpansionWithDate :withDate="true" v-model="newWithDateObj">
        <template v-slot:header>
            <v-col cols="12"
                   class="text--secondary py-1"
                   style="font-size:18px;">
                {{newWithDateObj.school || 'Write some your education experience'}}
            </v-col>
        </template>
        <template v-slot:actions>
            <slot name="actions"></slot>
        </template>
        <template v-slot:body>
            <v-col cols="12">
                <v-text-field
                        label="School"
                        v-model="newWithDateObj.school"
                >
                </v-text-field>
            </v-col>
            <v-row dense>
                <v-col cols="6">
                    <v-text-field
                            label="Degree"
                            v-model="newWithDateObj.degree"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                            label="City"
                            v-model="newWithDateObj.city"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-col cols="12">
                <v-text-field
                        label="Write some description"
                        v-model="newWithDateObj.description"
                />
            </v-col>
        </template>
    </ExpansionWithDate>
</template>

<script>
    import ExpansionWithDate from "./ExpansionWithDate"
    export default {
        name: "ExpansionWithEducations",
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