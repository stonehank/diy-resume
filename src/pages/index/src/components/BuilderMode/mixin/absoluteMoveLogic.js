export default{
    data(){
        return {
            transitionMode:{},
        }
    },
    methods:{
        detectStart(componentData){
            let id=componentData.id
            this.transitionMode[id]=false
            this.transitionMode=Object.assign({},this.transitionMode)
        },
        toggleTransition(componentData){
            if(componentData && componentData.styleConfig.position==='absolute'){
                this.transitionMode[componentData.id]=!this.transitionMode[componentData.id]
                this.transitionMode=Object.assign({},this.transitionMode)
            }
        }
    }
}
