<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <label>Personal Details</label>
            </v-col>
            <v-col cols="12">
                <v-text-field
                        data-test="jobPosition"
                        label="Wanted Job Position"
                        outlined
                        v-model="newPersonalInfo.jobPosition">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        label="FullName"
                        outlined
                        v-model="newPersonalInfo.fullName">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex">
                <v-file-input
                        accept="image/*"
                        placeholder="Pick an image"
                        label="Avatar"
                        @change="getTheFile"
                ></v-file-input>
                <div v-if="newPersonalInfo.avatar"
                     style="
                        width:48px;
                        height:48px;
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                     "
                     :style="`background-image:url(${newPersonalInfo.avatar})`">

                </div>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        label="Email"
                        outlined
                        v-model="newPersonalInfo.email">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        label="Phone"
                        outlined
                        v-model="newPersonalInfo.phone">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        label="Country"
                        outlined
                        v-model="newPersonalInfo.country">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field
                        label="City"
                        outlined
                        v-model="newPersonalInfo.city">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <label>Professional Summary</label>
            </v-col>
            <v-col cols="12">
                <v-textarea auto-grow label="Talk about yourself" :rows="3" outlined v-model="newPersonalInfo.description"></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <label>Employment History</label>
            </v-col>
            <v-col class="d-flex align-center" cols="12" v-for="(_,index) in newPersonalInfo.employments" :key="index">
                <ExpansionWithEmployment v-model="newPersonalInfo.employments[index]">
                    <template v-slot:actions>
                        <v-btn icon color="error"
                               @click="()=>removeCurEmployment(index)">
                            <v-icon color="error">fas fa-times-circle</v-icon>
                        </v-btn>
                    </template>
                </ExpansionWithEmployment>
            </v-col>
            <v-col :cols="12" class="text-right">
                <v-btn icon class="mr-6" color="success" @click="addOneEmployment"><v-icon>fas fa-plus-circle</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <label>Projects</label>
            </v-col>
            <v-col class="d-flex align-center" cols="12" v-for="(_,index) in newPersonalInfo.projects" :key="index">
                <ExpansionWithProjects v-model="newPersonalInfo.projects[index]">
                    <template v-slot:actions>
                        <v-btn data-test="remove-project"
                               icon color="error"
                               @click="()=>removeCurProject(index)">
                            <v-icon color="error">fas fa-times-circle</v-icon>
                        </v-btn>
                    </template>
                </ExpansionWithProjects>
            </v-col>
            <v-col :cols="12" class="text-right">
                <v-btn data-test="add-project" icon class="mr-6" color="success" @click="addOneProject"><v-icon>fas fa-plus-circle</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <label>Educations</label>
            </v-col>
            <v-col v-if="newPersonalInfo.educations" class="d-flex align-center" cols="12" v-for="(_,index) in newPersonalInfo.educations" :key="index">
                <ExpansionWithEducations v-model="newPersonalInfo.educations[index]">
                    <template v-slot:actions>
                        <v-btn icon color="error"
                               @click="()=>removeCurEdu(index)">
                            <v-icon color="error">fas fa-times-circle</v-icon>
                        </v-btn>
                    </template>
                </ExpansionWithEducations>
            </v-col>
            <v-col :cols="12" class="text-right">
                <v-btn icon class="mr-6" color="success" @click="addOneEdu"><v-icon>fas fa-plus-circle</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <label>Skills</label>
            </v-col>
            <v-col class="d-flex align-center" cols="12" v-for="(_,index) in newPersonalInfo.skills" :key="index">
                <ExpansionWithSkills v-model="newPersonalInfo.skills[index]">
                    <template v-slot:actions>
                        <v-btn icon color="error"
                               @click="()=>removeCurSkill(index)">
                            <v-icon color="error">fas fa-times-circle</v-icon>
                        </v-btn>
                    </template>
                </ExpansionWithSkills>
            </v-col>
            <v-col :cols="12" class="text-right">
                <v-btn icon class="mr-6" color="success" @click="addOneSkill"><v-icon>fas fa-plus-circle</v-icon></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ExpansionWithDate from "./ExpansionWithDate"
    import ExpansionWithEmployment from "./ExpansionWithEmployment"
    import ExpansionWithProjects from "./ExpansionWithProjects"
    import ExpansionWithSkills from "./ExpansionWithSkills"
    import ExpansionWithEducations from "./ExpansionWithEducations"
    import deepClone from 'clone-deep'
    /**
     * 1. 所有数组的结构必须存在sheet内部， slot_name数组的key值(必须是数组)
     * 2. ['employments','educations','skills','projects']
     */
    export default {
        name: "FillYourData",
        components: {
            ExpansionWithEducations,
            ExpansionWithSkills, ExpansionWithProjects, ExpansionWithEmployment, ExpansionWithDate
        },
        props:{
            personalInfo:Object,

        },
        model:{
            prop:'personalInfo',
            event:'input'
        },
        data(){
            return{
                newPersonalInfo:this.personalInfo,
            }
        },
        watch:{
            personalInfo: {
                deep: true,
                handler: function (newVal) {
                    this.newPersonalInfo = newVal
                }
            },
            newPersonalInfo: {
                deep: true,
                handler: function (newVal) {
                    // console.log('fill',newVal)
                    this.$emit('input', newVal)
                }
            },
        },
        methods:{
            getTheFile(file){
                if(!file) {
                    this.newPersonalInfo.avatar=''
                    return
                }
                if(!!window.indexedDB){
                    let reader = new FileReader();
                    let self=this
                    reader.onload = function(){
                        self.newPersonalInfo.avatar = reader.result;
                    };
                    reader.readAsDataURL(file);
                }else{
                    this.newPersonalInfo.avatar=URL.createObjectURL(file)
                }
            },
            afterAction(){
                this.newPersonalInfo=deepClone(this.newPersonalInfo)
            },
            addOneEmployment(){
                this.newPersonalInfo.employments.push({
                    company:'',
                    startAt:'',
                    endAt:'',
                    jobPosition:'',
                    description:['']
                })
                this.afterAction()
            },
            addOneProject(){
                this.newPersonalInfo.projects.push({
                    name:'',
                    link:{
                        value:'',
                        href:'',
                    },
                    description:'',
                    startAt:'',
                    endAt:'',
                })
                this.afterAction()
            },
            addOneSkill(){
                this.newPersonalInfo.skills.push({
                    label:'',
                    value:'',
                })
                this.afterAction()
            },
            addOneEdu(){
                if(!this.newPersonalInfo.educations){
                    this.newPersonalInfo.educations=[]
                }
                this.newPersonalInfo.educations.push( {
                    school:'',
                    degree:'',
                    startAt:'',
                    endAt:'',
                    city:'',
                    description:'',
                })
                this.afterAction()
            },
            removeCurEdu(index){
                this.newPersonalInfo.educations.splice(index,1)
                this.afterAction()
            },
            removeCurSkill(index){
                this.newPersonalInfo.skills.splice(index,1)
                this.afterAction()
            },
            removeCurEmployment(index){
                this.newPersonalInfo.employments.splice(index,1)
                this.afterAction()
            },
            removeCurProject(index){
                this.newPersonalInfo.projects.splice(index,1)
                this.afterAction()
            }
        }
    }
</script>

<style scoped>

</style>
