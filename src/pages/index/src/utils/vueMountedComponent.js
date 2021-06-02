import Vue from "vue"


function filterTheVueInstance(VueComponent){
    // console.log(VueComponent)
    VueComponent.$el.innerHTML=removeReverseInHTML(VueComponent.$el.innerHTML)
    return VueComponent
}

function  removeReverseInHTML(str){
    return str.replace(/--reverse/g,'')
}

export default function vueMountedComponent(Component,props){
    let Renderer=Vue.extend(Component)
    return filterTheVueInstance(new Renderer({
        propsData: {
            ...props,
            isToolsGhost:true,
        }
    }).$mount())
}