export default function calcPreviewSizeScale(ele,options={width:'auto',height:'auto'}){
    if(!ele)return {}
    let pageW=$('#hidden-page').outerWidth()
    let pageH=$('#hidden-page').outerHeight()
    let previewCardW=(options.width==='auto' ? $(ele).width() : options.width) - 32
    let previewCardH=(options.height==='auto' ? $(ele).height() : options.height) - 32
    let hScale=previewCardH / pageH
    let wScale=previewCardW / pageW
    let previewScale=Math.min(wScale,hScale)
    previewCardH=pageH*previewScale
    previewCardW=pageW*previewScale
    return {
        previewCardW,
        previewCardH,
        previewScale
    }
}
