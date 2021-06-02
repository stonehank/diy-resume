<template>
    <v-btn @click.prevent="()=>clickEvent(clickParam)"
            class="cancel-button close pa-0"
            :class="(small ? 'cancel-button-small' : 'cancel-button-normal')+ (keepHoverEffect ? ' hover-effect' : '')"
            >
        <span class="bar1"></span>
        <span class="bar2"></span>
    </v-btn>
</template>

<script>
  export default {
    name: "CancelButton",
      props:{
        clickEvent:{
            default:()=>{},
            type:Function,
        },
          clickParam: {
            default:null
          },
          small:Boolean,
          keepHoverEffect: {
              default:true
          }
      },

  }
</script>

<style scoped>

    .cancel-button-small{
        height: 18px !important;
        width: 18px !important;
        min-width: 18px !important;
    }
    .cancel-button-small span{
        width: 14px;
        min-width: 14px;
    }
    .cancel-button-normal{
        height: 24px !important;
        width: 24px !important;
        min-width: 24px !important;
    }
    .cancel-button-normal span{
        width: 14px;
        min-width: 14px;
    }
    .cancel-button{
        outline: none;
        border: none;
        transition: .5s;
        background: inherit;
        color: #000;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cancel-button span{
        height: 2px;
        display: block;
        background: var(--text-primary);
        transition:.5s;
        position: absolute;
        top: 50%;
        left: 50%;
    }
    .cancel-button:hover{
        background:var(--error-color);
        animation:scale .5s;
    }
    .cancel-button:hover span{
        background:#fff
    }
    .bar1{transform: translate(-50%,-50%)  rotate(45deg);}
    .bar2{transform: translate(-50%,-50%)  rotate(-45deg);}

    .hover-effect.cancel-button{
        background:var(--error-color) !important;
        animation:scale .5s;
    }
    .hover-effect.cancel-button span{
        background:#fff !important;
    }
    @keyframes scale {
        0%{
            transform:scale(1)
        }
        50%{
            transform:scale(1.2)
        }
        100%{
            transform:scale(1)
        }
    }
</style>
