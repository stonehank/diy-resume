import Home from "../../src/pages/index/src/components/Home"
import { createLocalVue, mount } from '@vue/test-utils'
// import {getFromCache, setCache} from "../../src/pages/index/src/utils/cacheControl"
import {COOKIE_INFO_SHOW} from '../../src/pages/index/src/utils/CONSTANT'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"


describe('TextMode Initial', () => {

    const localVue = createLocalVue()
    let vuetify=new Vuetify()

    const router = new VueRouter()
    let wrapper = mount(Home,{
        localVue,
        vuetify,
        router
    })

    it('after show cookie info', async () => {
        expect(wrapper.vm.showCookieInfo).toBe(true)
        // let result=await getFromCache(COOKIE_INFO_SHOW)
        // expect(result).toBe(false)
    })



})
