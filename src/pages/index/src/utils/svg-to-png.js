
export default function svgToPng(svg, callback) {
    const url = getSvgUrl(svg)
    return svgUrlToPng(url)
        .then((imgData) => {
            URL.revokeObjectURL(url)
            return imgData
        })
}
function getSvgUrl(svg) {
    return  URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
}
function svgUrlToPng(svgUrl) {
    return new Promise((res)=>{
        const svgImage = document.createElement('img')
        document.body.appendChild(svgImage)
        svgImage.onload = function () {
            const canvas = document.createElement('canvas')
            let w=svgImage.clientWidth, h=svgImage.clientHeight
            let ratio= h / 128
            canvas.width = w / ratio
            canvas.height = 128
            const canvasCtx = canvas.getContext('2d')
            canvasCtx.drawImage(svgImage, 0, 0)
            const imgData = canvas.toDataURL('image/png')
            svgImage.remove()
            res(imgData)
        }
        svgImage.src = svgUrl
    })

}
