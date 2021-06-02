import vueMountedComponent from "../../src/pages/index/src/utils/vueMountedComponent"
import { createLocalVue, mount } from '@vue/test-utils'
import MountTest from "./MountTest"

it('equal mount',()=>{
    const localVue = createLocalVue()

    let wrapper1 = mount(MountTest,{
        localVue,
        propsData:{
            msg:'test-msg'
        }
    })
    let wrapper2=vueMountedComponent(MountTest,{msg:'test-msg'})
    expect(wrapper1.vm.$el).toEqual(wrapper2.$el)
})
