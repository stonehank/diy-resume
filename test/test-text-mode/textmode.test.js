import TextMode from '../../src/pages/index/src/components/TextMode'
import TextModeController from "../../src/pages/index/src/components/TextMode/TextModeController"
import FillYourData from "../../src/pages/index/src/components/TextMode/FillYourData"
import PreviewPage from "../../src/pages/index/src/components/BuilderMode/PreviewPage"
import NavigationDrawer from "../../src/pages/index/src/components/commons/NavigationDrawer"
import Navigation from "../../src/pages/index/src/components/Navigation"
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"
import {templateData} from "../mock-data"

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

describe('TextMode Initial', () => {

    const localVue = createLocalVue()
    let vuetify=new Vuetify()

    const router = new VueRouter()
    let wrapper = mount(TextMode,{
        localVue,
        vuetify,
        router,
        mocks:{
            $mq:1024
        }
    })

    it('renders required component', () => {
        let hasTextModeController=wrapper.findComponent(TextModeController).exists()
        let hasNavigationDrawer=wrapper.findComponent(NavigationDrawer).exists()
        let hasFillYourData=wrapper.findComponent(FillYourData).exists()
        let hasNavigation=wrapper.findComponent(Navigation).exists()
        expect(hasTextModeController && hasFillYourData && hasNavigationDrawer && hasNavigation).toBe(true)
    })

    it('click to toggle navigation menu',async () => {
        let navigationComponent=wrapper.findComponent(Navigation)
        let menuBtn=navigationComponent.find('[data-test=nav-menu-btn]')
        expect(navigationComponent.vm.menuShowing).toBe(false)
        await menuBtn.trigger('click')
        expect(navigationComponent.vm.menuShowing).toBe(true)
        navigationComponent.vm.updateMenuShowing(false)
        expect(navigationComponent.vm.menuShowing).toBe(false)
        await menuBtn.trigger('click')
        navigationComponent.vm.handleRoute('/test')
        expect(navigationComponent.vm.menuShowing).toBe(false)
    })

    it('preview will hide/show in different screen size',(done) => {
        // Default is 1024*768
        // expect(window.innerWidth===1024 && window.innerHeight===768).toBe(true)
        expect(wrapper.findComponent(PreviewPage).exists()).toBe(false)
        // wrapper.mocks.$mq=1280
        wrapper = mount(TextMode,{
            localVue,
            vuetify,
            router,
            mocks:{
                $mq:1280
            }
        })
        wrapper.vm.$nextTick(function(){
            expect(wrapper.findComponent(PreviewPage).exists()).toBe(true)
            done()
        })
    })

    it('typing will update state',async () => {
        let jobPositionInput=wrapper.find('[data-test=jobPosition]')
        expect(wrapper.vm.personalInfo.jobPosition).toBe('')
        await jobPositionInput.setValue('test job title')
        expect(wrapper.vm.personalInfo.jobPosition).toBe('test job title')
    })

    it('click to add a new project',async () => {
        let addProjectBtn=wrapper.find('[data-test=add-project]')
        let removeProjectBtn=wrapper.find('[data-test=remove-project]')
        expect(wrapper.vm.personalInfo.projects.length).toBe(1)
        await addProjectBtn.trigger('click')
        expect(wrapper.vm.personalInfo.projects.length).toBe(2)
        await removeProjectBtn.trigger('click')
        expect(wrapper.vm.personalInfo.projects.length).toBe(1)
    })


    it('renders template list', async () => {
        // console.log(wrapper.html())
        wrapper.setData({templateList:[templateData]})
        await wrapper.find('[data-test=choose-template-btn]').trigger('click')
        expect(wrapper.findAll('[data-test=choose-template-card]').length).toBe(1)
    })

    it('choose a template, convert to page data', async () => {
        expect(wrapper.vm.pageData.length).toBe(0)
        await wrapper.find('[data-test=choose-template-card]').trigger('click')
        await timeout(1000)
        expect(wrapper.vm.pageData.length>0).toBe(true)
    })


})
