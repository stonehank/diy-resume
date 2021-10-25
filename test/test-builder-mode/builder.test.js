import BuilderController from "../../src/pages/index/src/components/BuilderMode/BuilderController"
import DIYRender from "../../src/pages/index/src/components/BuilderMode/DIYRender"
import DIYTools from "../../src/pages/index/src/components/BuilderMode/DIYTools"
import CustomTemplate from "../../src/pages/index/src/components/BuilderMode/CustomTemplate"
import PreviewPage from "../../src/pages/index/src/components/BuilderMode/PreviewPage"
import ResumeCache from "../../src/pages/index/src/components/BuilderMode/ResumeCache"
import BuilderMode from "../../src/pages/index/src/components/BuilderMode"
import {createLocalVue, mount} from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"
import RenderParagraph from "../../src/pages/index/src/components/BuilderMode/RenderEle/RenderParagraph"
import TooltipIconBtn from "../../src/pages/index/src/components/commons/TooltipIconBtn"
import StyleWrapper from "../../src/pages/index/src/components/BuilderMode/RenderEle/StyleWrapper"
import ConfigEle from "../../src/pages/index/src/components/BuilderMode/config/components/ConfigEle"
import CommonColorConfig from "../../src/pages/index/src/components/BuilderMode/config/components/CommonColorConfig"
import PositionConfig from "../../src/pages/index/src/components/BuilderMode/config/PositionConfig"
import BorderConfig from "../../src/pages/index/src/components/BuilderMode/config/BorderConfig"
import TemplateConfig from "../../src/pages/index/src/components/BuilderMode/config/TemplateConfig"

let vuetify=new Vuetify()
const router = new VueRouter()
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
describe('BuilderMode Initial', () => {
    const localVue = createLocalVue()
    const wrapper = mount(BuilderMode,{
        localVue,
        vuetify,
        router,
        mocks:{
            $mq:'1280'
        }
    })
    const resizeWindow = (x, y) => {
        window.innerWidth = x
        window.innerHeight = y
        window.dispatchEvent(new Event('resize'))
    }
    resizeWindow(1280,800)
    it('screen size large  than 1264, renders required component', () => {

        let hasBuilderController=wrapper.findComponent(BuilderController).exists()
        let hasDIYRender=wrapper.findComponent(DIYRender).exists()
        let hasDIYTools=wrapper.findComponent(DIYTools).exists()
        let hasCustomTemplate=wrapper.findComponent(CustomTemplate).exists()
        let hasPreviewPage=wrapper.findComponent(PreviewPage).exists()
        let hasResumeCache=wrapper.findComponent(ResumeCache).exists()
        expect(window.innerWidth===1280 && window.innerHeight===800).toBe(true)
        expect(hasBuilderController
            && hasDIYRender
            && hasDIYTools
            && hasCustomTemplate
            && hasPreviewPage
            && hasResumeCache).toBe(true)
    })

    it('render a drag item', (done) => {
        expect(wrapper.vm.$el.querySelector('#page > .render-wrapper').children.length).toBe(0)
        expect(wrapper.findComponent(DIYRender).findComponent(RenderParagraph).exists()).toBe(false)
        wrapper.setData({pageData:[
                {
                    id:'test-id',
                    name:'paragraph',
                    styleConfig:{
                        margin:[0,0,0,0],
                        padding:[0,0,0,0],
                        borderTopWidth:0,
                        borderRightWidth:0,
                        borderBottomWidth:0,
                        borderLeftWidth:0,
                        borderColor:'#888',
                        borderTopLeftRadius:4,
                        borderTopRightRadius:4,
                        borderBottomRightRadius:4,
                        borderBottomLeftRadius:4,
                        borderStyle:'solid',
                        position:'static',
                        top:'auto',
                        left:'auto',
                        right:'auto',
                        bottom:'auto',
                        lineHeight:16,
                        letterSpacing:1,
                        textAlign:'center',
                        color:'#000',
                        fontSize:16,
                        background:'#fff',
                        fontWeight: 'normal',
                        fontStyle:'inherit',
                        colorInherit:false,
                        fontSizeInherit:false,
                        backgroundInherit:false,
                        lineHeightInherit:false,
                        letterSpacingInherit:false,
                        textAlignInherit:false,
                        fontWeightInherit: false,
                        fontStyleInherit:true,
                        height:'auto',
                        col:12,
                    },
                    config:{
                        value:'This is test paragraph',
                        icon:true,
                        appendIcon:'fas fa-angle-left',
                        prependIcon:'fas fa-angle-right',
                    },
                    pin:true
                }
            ]})
        expect(wrapper.vm.pageData.length).toBe(1)
        wrapper.vm.$nextTick(function(){
            expect(wrapper.vm.$el.querySelector('#page > .render-wrapper').children.length).toBe(1)
            expect(wrapper.findComponent(DIYRender).findComponent(RenderParagraph).exists()).toBe(true)
            done()
        })
    })

    it('hover to show actions',  (done) => {
        let paragraphWrapper=wrapper.findComponent(DIYRender).findComponent(RenderParagraph).findComponent(StyleWrapper)
        expect(wrapper.findComponent(TooltipIconBtn).exists()).toBe(false)
        paragraphWrapper.setData({hoverActive:true})
        wrapper.vm.$nextTick(function(){
            expect(wrapper.findComponent(TooltipIconBtn).exists()).toBe(true)
            done()
        })
    })

    it('test quick edit mode',  async () => {
        let paragraphWrapper=wrapper.findComponent(DIYRender).findComponent(RenderParagraph).findComponent(StyleWrapper)
        expect(paragraphWrapper.vm.curData.config.value).toBe('This is test paragraph')
        expect(paragraphWrapper.find('[data-test=paragraph-quick-edit]').exists()).toBe(false)
        await wrapper.find('[data-test=quick-edit]').trigger('click')
        let paragraphQuickEdit=paragraphWrapper.find('[data-test=paragraph-quick-edit]')
        expect(paragraphQuickEdit.exists()).toBe(true)
        await paragraphQuickEdit.setValue('Modified paragraph')
        await paragraphQuickEdit.trigger('blur')
        await wrapper.find('[data-test=quick-edit]').trigger('click')
        await timeout(1000)
        expect(paragraphWrapper.vm.$props.componentData.config.value).toBe('Modified paragraph')
    })

    it('click save as custom tool',  async () => {
        expect(wrapper.vm.customTemplate.length).toBe(3)
        let paragraphWrapper=wrapper.findComponent(DIYRender).findComponent(RenderParagraph).findComponent(StyleWrapper)
        let saveBuilderToolBtn=paragraphWrapper.find('[data-test=save-builder-tool]')
        expect(saveBuilderToolBtn.find('button').exists()).toBe(true)
        await saveBuilderToolBtn.find('button').trigger('click')
        expect(wrapper.vm.customTemplate.length).toBe(4)
    })

    it('click show config builder element',  async () => {
        let paragraphWrapper=wrapper.findComponent(DIYRender).findComponent(RenderParagraph).findComponent(StyleWrapper)
        let configBuilderToolBtn=paragraphWrapper.find('[data-test=config-builder-tool]')
        expect(paragraphWrapper.find('[data-test=config-drawer]').exists()).toBe(false)
        await configBuilderToolBtn.find('button').trigger('click')
        expect(paragraphWrapper.find('[data-test=config-drawer]').exists()).toBe(true)
        // console.log(paragraphWrapper.find('[data-test=config-drawer]').html())
    })

    it('swap to position config tab',   (done) => {
        let paragraphWrapper=wrapper.findComponent(DIYRender).findComponent(RenderParagraph).findComponent(StyleWrapper)
        let configEle=paragraphWrapper.findComponent(ConfigEle)
        expect(paragraphWrapper.findComponent(CommonColorConfig).exists()).toBe(true)
        expect(wrapper.findComponent(PositionConfig).exists()).toBe(false)
        configEle.setData({tab:1})
        setTimeout(()=>{
            expect(wrapper.findComponent(PositionConfig).exists()).toBe(true)
            done()
        },200)
    })
    it('some feature in position config tab',  async () => {
        let positionConfig=wrapper.findComponent(PositionConfig)
        let arrayList=['top','right','bottom','left']
        for(let i=0;i<arrayList.length;i++){
            let cur=arrayList[i]
            let checkbox=positionConfig.find('[data-test=position-'+cur+']')
            expect(positionConfig.vm.newComponentData.styleConfig[cur]).toEqual('auto')
            await checkbox.trigger('click')
            expect(positionConfig.vm.newComponentData.styleConfig[cur]).not.toEqual('auto')
            await checkbox.trigger('click')
            expect(positionConfig.vm.newComponentData.styleConfig[cur]).toEqual('auto')
        }
    })

    it('swap to border config tab',   (done) => {
        let paragraphWrapper=wrapper.findComponent(DIYRender).findComponent(RenderParagraph).findComponent(StyleWrapper)
        let configEle=paragraphWrapper.findComponent(ConfigEle)
        configEle.setData({tab:2})
        setTimeout(()=>{
            expect(wrapper.findComponent(BorderConfig).exists()).toBe(true)
            done()
        },200)
    })

    it('some feature in border config tab',  async () => {
        let borderConfig=wrapper.findComponent(BorderConfig)
        let arrayList=[
            {label:'top-left',value:'borderTopLeftRadius'},
            {label:'top-right',value:'borderTopRightRadius'},
            {label:'bottom-right',value:'borderBottomRightRadius'},
            {label:'bottom-left',value:'borderBottomLeftRadius'},
        ]
        for(let i=0;i<arrayList.length;i++){
            let {label,value}=arrayList[i]
            let checkbox=borderConfig.find('[data-test=radius-'+label+']')
            expect(borderConfig.vm.newComponentData.styleConfig[value]).not.toEqual('50%')
            await checkbox.trigger('click')
            expect(borderConfig.vm.newComponentData.styleConfig[value]).toEqual('50%')
            await checkbox.trigger('click')
            expect(borderConfig.vm.newComponentData.styleConfig[value]).not.toEqual('50%')
        }
    })

    it('swap to template config tab',   (done) => {
        let paragraphWrapper=wrapper.findComponent(DIYRender).findComponent(RenderParagraph).findComponent(StyleWrapper)
        let configEle=paragraphWrapper.findComponent(ConfigEle)
        configEle.setData({tab:3})
        setTimeout(()=>{
            expect(wrapper.findComponent(TemplateConfig).exists()).toBe(true)
            done()
        },200)
    })

    it('some feature in border config tab',  async () => {
        let templateConfig=wrapper.findComponent(TemplateConfig)
        let slotInput=templateConfig.find('[data-test=slot-input]')
        await slotInput.setValue('test-slot')
        expect(templateConfig.vm.newComponentData.template_slug).toEqual('test-slot')
    })
})
