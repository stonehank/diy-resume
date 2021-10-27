let currentFont=''


export function setFont(font){
    return import('jsDir/fonts/'+font+'-normal.js').then(()=>{
        currentFont=font
    })

}

export function getFont(){
    return currentFont
}
