const dirVars = require('./base/dir-vars.config.js')
const path=require('path')
module.exports={
  extensions: ['.js','.vue'],
    alias: {
      "react-is": path.resolve(dirVars.staticRootDir, 'node_modules/react-is'),
      "html2canvas": path.resolve(dirVars.staticRootDir, 'node_modules/html2canvas'),
      localesDir: dirVars.localesDir,
      vendorDir: dirVars.vendorDir,
      assetsDir: dirVars.assetsDir,
      cssDir: dirVars.cssDir,
      jsDir: dirVars.jsDir,
      imagesDir: dirVars.imagesDir,
      componentsDir: dirVars.componentsDir,
      layoutDir: dirVars.layoutDir,
      logicDir: dirVars.logicDir,
      webpackConfig: dirVars.webpackConfig
  }
}
