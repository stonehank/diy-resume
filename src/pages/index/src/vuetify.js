// Vuetify tree shaking
import Vuetify from "vuetify/lib"
import Vue from 'vue'


Vue.use(Vuetify)

export default new Vuetify({

    theme: {
        themes:{
            light:{
                primary: '#2196F3',
                secondary: '#AB47BC',
                accent: '#82B1FF',
                error: '#b71c1c',
                info: '#2196f3',
                success: '#4caf50',
                warning: '#FFC107',
            },
            dark:{
                primary: '#155e9b',
                secondary: '#89439b',
                accent: '#82B1FF',
                error: '#cf1d1d',
                info: '#2196f3',
                success: '#54cd58',
                warning: '#FFC107',
            }
        }
    },
    icons:{
        iconfont:'fa',
    }
})
