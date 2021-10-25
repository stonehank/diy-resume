import {getFromCache,setCache} from './cacheControl'

$(document).ready(()=>{
  changeTheme()
  $('#theme-switch').on('change',function(){
    changeTheme(this.checked ? 'dark' : 'light')
  })
})

function changeTheme(theme){
  let curTheme=theme
  if(curTheme==null){
    // curTheme=getFromCache('theme-color') || 'light'
    curTheme='light'
  }
  _change(curTheme)
}

function _change(curTheme){
  $('#theme-switch').prop('checked', curTheme==='dark')
  setCache('theme-color',curTheme,999999)
  let className=document.documentElement.className
  let themeName=`theme-${curTheme}`
  if(className==='')document.documentElement.className=themeName
  else{
    if(/theme-(?:light|dark)($|\s)/.test(className)){
      document.documentElement.className=className.replace(/theme-(?:light|dark)($|\s)/,themeName+'$1')
    }else{
      document.documentElement.className+=' '+themeName
    }
  }
}
