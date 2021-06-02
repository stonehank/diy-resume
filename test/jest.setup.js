import 'jest-canvas-mock'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"
import VModal from "vue-js-modal"
import frag from "vue-frag"
import 'regenerator-runtime/runtime'
import { config } from '@vue/test-utils'
import PerfectScrollbar from 'vue2-perfect-scrollbar'

Vue.config.productionTip = false
Vue.config.silent = true
global.$=require('jquery')


config.mocks['$mq'] = '1024'

Vue.use(Vuetify)
Vue.use(PerfectScrollbar)
Vue.use(VueRouter)
Vue.use(VModal)
Vue.directive('frag', frag)



