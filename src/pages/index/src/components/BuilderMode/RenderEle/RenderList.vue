<template>
    <StyleWrapper tag="ul"
                  v-model="curData"
                  :style="{
                      listStyle:curData.config.listStyle
                  }"
    >
        <template v-slot:default>
            <li class="render-item"
                v-for="(val,index) in curData.config.value"
                :key="index"
                :style="{
                    padding:curData.config.dense ? 0 : '6px 0',
                }"
            >
                <span v-if="!textMode">{{val}}</span>
                <v-text-field v-else dense hide-details filled
                              @blur="debounceUpdateData"
                              v-model="curData.config.value[index]" />
            </li>
        </template>
        <template v-slot:common-config>
            <div class="col-12">
                <label>Text</label>
                <v-text-field
                        dense
                        hide-details
                        v-for="(_,index) in curData.config.value"
                        :key="index"
                        v-model="curData.config.value[index]"
                >
                    <template v-slot:prepend>
                        <label class="mt-1"><b>#</b>{{index+1}}</label>
                    </template>
                    <template v-slot:append-outer>
                        <v-btn icon color="error" small @click="()=>removeList(index)">
                            <v-icon small>fas fa-times</v-icon>
                        </v-btn>
                    </template>
                </v-text-field>
                <v-btn icon color="success" small @click="addList">
                    <v-icon small>fas fa-plus</v-icon>
                </v-btn>
            </div>
            <div class="col-8 col-md-6">
                <label>List style</label>
                <v-select
                        :items="listStyleList"
                        v-model="curData.config.listStyle"
                        dense
                        hide-details>
                </v-select>
            </div>
            <div class="col-4 col-md-4">
                <label>Dense</label>
                <v-checkbox v-model="curData.config.dense" />
            </div>
        </template>
    </StyleWrapper>
</template>

<script>
    import RenderTemplate from './RenderTemplate'
    import StyleWrapper from "./StyleWrapper"
    import ConfigEle from "../config/components/ConfigEle"
    import CommonConfig from "../config/CommonConfig"
    import PositionConfig from "../config/PositionConfig"
    import ComponentConfigModal from "../../commons/ComponentConfigModal"
    import NavigationDrawer from "../../commons/NavigationDrawer"
    export default {
        name: "RenderList",
        components: {NavigationDrawer, ComponentConfigModal, PositionConfig, CommonConfig, ConfigEle, StyleWrapper},
        extends:RenderTemplate,
        methods:{
            addList(){
                this.curData.config.value.push('')
            },
            removeList(index){
                this.curData.config.value.splice(index,1)
            }
        },
        data(){
            return {
                listStyleList:[
                    'disc',
                    'circle',
                    'square',
                    'decimal',
                    'decimal-leading-zero',
                    'lower-alpha',
                    'lower-roman',
                    'upper-alpha',
                    'upper-roman',
                    'none'
                ],
            }
        }
    }
</script>

<style scoped>
    .render-item{
        list-style: inherit;
        border-radius: inherit;
        font-size: inherit;
    }
    .clearAllStyle{
        outline:none;
    }
</style>
<style scoped lang="scss" src="./render-style.scss"></style>
