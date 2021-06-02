<template>
    <ExpansionWithDate :withDate="true" v-model="newWithDateObj">
        <template v-slot:header>
            <v-col cols="12"
                   class="text--secondary py-1"
                   style="font-size:18px;">
                {{newWithDateObj.company || 'Write some your employment experience'}}
            </v-col>
        </template>
        <template v-slot:actions>
            <slot name="actions"></slot>
        </template>
        <template v-slot:body>
            <v-col cols="12">
                <v-text-field
                        label="Company Name"
                        v-model="newWithDateObj.company"
                >

                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field
                        label="Job Title"
                        v-model="newWithDateObj.jobPosition"
                >

                </v-text-field>
            </v-col>
            <v-col class="d-flex align-center" cols="12" v-for="(_,index) in newWithDateObj.description" :key="index">
                <v-text-field
                        label="Show what you do in the company"
                        v-model="newWithDateObj.description[index]"
                />
                <v-btn icon color="error" @click="()=>removeCurDesc(index)"><v-icon>fas fa-times</v-icon></v-btn>
            </v-col>
            <v-col :cols="12">
                <v-btn icon color="success" @click="addOneDesc"><v-icon>fas fa-plus</v-icon></v-btn>
            </v-col>
        </template>
    </ExpansionWithDate>
</template>

<script>
    import ExpansionWithDate from "./ExpansionWithDate"
    export default {
        name: "ExpansionWithEmployment",
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
            addOneDesc(){
                this.newWithDateObj.description.push('')
            },
            removeCurDesc(index){
                this.newWithDateObj.description.splice(index,1)
            }
        }
    }
</script>

<style scoped>

</style>