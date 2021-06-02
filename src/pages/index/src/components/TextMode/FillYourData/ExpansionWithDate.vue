<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header disable-icon-rotate>
                <template v-slot:actions>
                    <slot name="actions"></slot>
                </template>
                <v-row no-gutters>
                    <slot name="header"></slot>
                    <v-col cols="12"
                           class="text--secondary"
                           v-if="withDate && (newWithDateObj.startAt || newWithDateObj.endAt)"
                    >
                        {{ newWithDateObj.startAt && newWithDateObj.endAt ?  newWithDateObj.startAt + ' - ' + newWithDateObj.endAt : ''}}
                        {{ newWithDateObj.startAt && !newWithDateObj.endAt ? 'Start from '+ newWithDateObj.startAt : ''}}
                        {{ !newWithDateObj.startAt && newWithDateObj.endAt ? 'End at '+ newWithDateObj.endAt : ''}}
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row
                        justify="start"
                        no-gutters
                >
                    <slot name="body"></slot>
                    <v-col cols="3" v-if="withDate">
                        <v-menu
                                ref="startMenu"
                                :close-on-content-click="false"
                                :return-value.sync="newWithDateObj.startAt"
                                offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="newWithDateObj.startAt"
                                        label="Start date"
                                        prepend-icon="far fa-calendar"
                                        readonly
                                        clearable
                                        v-bind="attrs"
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="newWithDateObj.startAt"
                                    no-title
                                    scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.startMenu.isActive = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.startMenu.save(newWithDateObj.startAt)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="3" v-if="withDate">
                        <v-menu
                                ref="endMenu"
                                :close-on-content-click="false"
                                :return-value.sync="newWithDateObj.endAt"
                                offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="newWithDateObj.endAt"
                                        label="End date"
                                        prepend-icon="far fa-calendar"
                                        readonly
                                        clearable
                                        v-bind="attrs"
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="newWithDateObj.endAt"
                                    no-title
                                    scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.endMenu.isActive = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.endMenu.save(newWithDateObj.endAt)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    export default {
        name: "ExpansionWithDate",
        props:{
            withDateObj:Object,
            withDate:{
                default:false
            }
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
    }
</script>

<style scoped>

</style>
