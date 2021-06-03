const layout = require('layoutDir/default-layout/html.js')
const contentPrefix=require('./content-prefix.ejs')
const content=require('./content.ejs')
const contentSuffix=require('./content-suffix.ejs')

module.exports = function buildPage(templateParams) {
  const language = templateParams.curLang
  const { author,publicPath,pageLocalesName,folderLocalesName1,folderLocalesName2,customPageConfig,isDev } = templateParams
  return layout.run({
    author,
    customPageConfig,
    contentPrefix,
    content,
    contentSuffix,
    language,
    publicPath,
    pageLocalesName,
    folderLocalesName1,
    folderLocalesName2,
    isDev
  })
}
