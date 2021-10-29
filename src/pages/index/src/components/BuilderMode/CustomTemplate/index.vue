<template>
    <div class="clearfix" style="position:relative" v-if="componentList.length>0">
        <h2>自定义构建组件</h2>
        <draggable
                :list="componentList"
                :group="{ name: group, pull: 'clone', put: false }"
                :sort="false"
                :clone="debugClone"
                :forceFallback="true"
        >
            <div v-for="(component,index) in componentList"
                 :id="component.id"
                 class="draggable-custom-item custom-template-item"
                 :style="{
                height:component.styleConfig.height ? component.styleConfig.height : 'auto'
             }"
                 :class="`col-12`"
                 :key="component.id"
            >
                <v-hover v-slot="{hover}" v-if="component.name==='sheet'">
                    <div style="position:relative"
                         :class="{'custom-template-on-hover':hover}"
                    >

                        <div v-if="hover">
                            <v-btn icon color="error" absolute top right style="z-index: 1;" @click="()=>removeCustomTemplate(index)">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </div>
                        <RenderSheet

                                :editable="false"
                                :draggable="false"
                                :group="group"
                                :component-data="component"
                                :index="index"
                        />

                    </div>
                </v-hover>
                <v-hover v-slot="{hover}" v-else-if="component.name==='list'" >
                    <div style="position:relative" :class="{'custom-template-on-hover':hover}">
                            <div v-if="hover">
                                <v-btn icon color="error" absolute top right style="z-index: 1;" @click="()=>removeCustomTemplate(index)">
                                    <v-icon>fas fa-trash-alt</v-icon>
                                </v-btn>
                            </div>
                            <RenderList

                                    :editable="false"
                                    :component-data="component"
                                    :index="index"
                            />
                    </div>
                </v-hover>
                <v-hover v-slot="{hover}" v-else-if="component.name==='paragraph'">
                    <div style="position:relative" :class="{'custom-template-on-hover':hover}">
                        <div v-if="hover">
                            <v-btn icon color="error" absolute top right style="z-index: 1;" @click="()=>removeCustomTemplate(index)">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </div>
                        <RenderParagraph
                                :editable="false"
                                :component-data="component"
                                :index="index"
                        />
                    </div>
                </v-hover>
                <v-hover v-slot="{hover}" v-else-if="component.name==='progress'">
                    <div style="position:relative" :class="{'custom-template-on-hover':hover}">
                        <div v-if="hover">
                            <v-btn icon color="error" absolute top right style="z-index: 1;" @click="()=>removeCustomTemplate(index)">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </div>
                        <RenderProgress
                                :editable="false"
                                :component-data="component"
                                :index="index"
                        />

                    </div>
                </v-hover>
                <v-hover v-slot="{hover}" v-else-if="component.name==='anchor'">
                    <div style="position:relative" :class="{'custom-template-on-hover':hover}">
                        <div v-if="hover">
                            <v-btn icon color="error" absolute top right style="z-index: 1;" @click="()=>removeCustomTemplate(index)">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </div>
                        <RenderAnchor
                                :editable="false"
                                :component-data="component"
                                :index="index"
                        />

                    </div>
                </v-hover>
                <v-hover v-slot="{hover}" v-else-if="component.name==='tag'">
                    <div style="position:relative" :class="{'custom-template-on-hover':hover}">
                        <div v-if="hover">
                            <v-btn icon color="error" absolute top right style="z-index: 1;" @click="()=>removeCustomTemplate(index)">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </div>
                        <RenderTag
                                :editable="false"
                                :component-data="component"
                                :index="index"
                        />
                    </div>
                </v-hover>


            </div>
        </draggable>
    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    import deepClone from "clone-deep"
    import {v4 as uuidv4} from "uuid"
    import RenderSheet from "../RenderEle/RenderSheet"
    import RenderList from "../RenderEle/RenderList"
    import RenderParagraph from "../RenderEle/RenderParagraph"
    import RenderProgress from "../RenderEle/RenderProgress"
    import RenderAnchor from "../RenderEle/RenderAnchor"
    import RenderTag from "../RenderEle/RenderTag"

    export default {
        name: "CustomTemplate",
        components: {draggable,RenderTag, RenderAnchor, RenderProgress, RenderParagraph, RenderList, RenderSheet},
        props:{
            componentList:Array,
            group:String,
            removeCustomTemplate:Function,
        },
        methods:{
            debugClone(origin){
                let newOne= deepClone(origin)
                newOne.id=uuidv4()
                return newOne
            },
        }
    }
</script>

<style scoped>

</style>
