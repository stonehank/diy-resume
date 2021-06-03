import 'logicDir/common.default-layout.js'
import frag from 'vue-frag'
import vuetify from './vuetify'
import Vue from 'vue'
import Main from './Main'
import VModal from 'vue-js-modal'
import routes from './router'
import Router from 'vue-router'
import VueStore from '@websanova/vue-store'
import VueMq from 'vue-mq'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import './style.scss'

Vue.use(PerfectScrollbar)
Vue.use(VueStore)
Vue.directive('frag', frag)
Vue.use(VModal)
Vue.use(Router)
console.log(window.isDev)
const router = new Router({
    linkActiveClass: 'active',
    routes,
    mode: 'history',
    base: window.isDev===false ? '/diy-resume-demo/' : '/'
})

Vue.use(VueMq, {
    breakpoints: {
        0:600,
        600:960,
        960:1264,
        1264:1904,
        1904:9999,
        Infinity:Infinity,
    },
    defaultBreakpoint:'0'
})

export default new Vue({
    vuetify:vuetify,
    router,
    el: '#root',
    render: h => h(Main)
})




