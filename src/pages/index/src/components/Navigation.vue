<template>
    <div class="mx-2">
        <v-btn data-test="nav-menu-btn" icon text @click="showMenu">
            <v-icon>fas fa-bars</v-icon>
        </v-btn>
        <NavigationDrawer
                fixed
                top
                left
                :style="`height:100vh;width:280px;`"
                :drawerShow="menuShowing"
                @input="updateMenuShowing"
        >
            <div class="d-flex align-center justify-center pr-3">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                            Resume DIY
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            stonehank
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-btn text large href="https://github.com/stonehank/diy-resume">
                    <v-icon large>fab fa-github</v-icon>
                </v-btn>
            </div>

            <v-divider></v-divider>
            <v-list
                    dense
                    nav
            >
                <v-list-item
                        v-if="item.path!=='/diy/builder' || +$mq>=1260"
                        v-for="item in items"
                        :key="item.title"
                        :input-value="$route.path===item.path"
                        @click.prevent="()=>handleRoute(item.path)"
                >
                    <v-list-item-icon>
                        <v-icon :color="item.color">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </NavigationDrawer>
    </div>
</template>

<script>
    import NavigationDrawer from "./commons/NavigationDrawer"
    export default {
        name: "Navigation",
        components: {NavigationDrawer},
        data(){
            return{
                menuShowing:false,
                items:[
                    {title:'Home page', icon:'fas fa-home',path:'/',color:null},
                    {title:'Text mode', icon:'fas fa-user-edit', path:'/diy/edit',color:'success'},
                    {title:'Builder mode', icon:'fas fa-code',path:'/diy/builder',color:'info'},
                ].filter(Boolean)
            }
        },
        methods:{
            showMenu(){
                this.menuShowing=true
            },
            hideMenu(){
                this.menuShowing=false
            },
            updateMenuShowing(val){
                if(this.menuShowing===val)return
                return val ? this.showMenu() : this.hideMenu()
            },
            handleRoute(path){
                if(this.$route.path===path)return
                this.hideMenu()
                this.$nextTick(function(){
                    this.$router.push(path)
                })
            }
        }
    }
</script>

<style scoped>

</style>
