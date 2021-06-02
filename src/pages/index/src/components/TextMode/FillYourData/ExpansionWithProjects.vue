<template>
    <ExpansionWithDate :withDate="true" v-model="newWithDateObj">
        <template v-slot:header>
            <v-col cols="12"
                   class="text--secondary py-1"
                   style="font-size:18px;">
                {{newWithDateObj.name || 'Write some your projects experience'}}
            </v-col>
        </template>
        <template v-slot:actions>
            <slot name="actions"></slot>
        </template>
        <template v-slot:body>
            <v-col cols="12">
                <v-text-field
                        label="Project Name"
                        v-model="newWithDateObj.name"
                >

                </v-text-field>
            </v-col>
            <v-row dense>
                <v-col cols="12">
                    <label>Project link (If has)</label>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                            label="Link text"
                            v-model="newWithDateObj.link.value"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                            label="Link href"
                            v-model="newWithDateObj.link.href"
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
        name: "ExpansionWithProjects",
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