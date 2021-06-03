const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const { publicPath } = require('./webpack-config/config')

module.exports = {

  mode: isDev ? 'development' : 'production',

  entry: require('./webpack-config/entry.config.js'),

  output: {
    path: path.join(__dirname, './dist'),
    filename: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[contenthash:8].js',
    publicPath: isDev ? '/' : (publicPath === '' ? '/' : publicPath)
  },

  resolve: require('./webpack-config/resolve.config.js'),

  devtool: isDev ? 'cheap-module-source-map' : false,

  plugins: require('./webpack-config/plugins.config.js'),

  optimization: require('./webpack-config/optimization.config.js'),

  module: require('./webpack-config/module.config.js'),

  stats:'errors-only',

  devServer: isDev ? {
    noInfo: true,
    historyApiFallback: true,
    clientLogLevel: 'silent',
    hot: true,
    port: 3030,
    host: getIP(),
  } : {},
}

function getIP (force) {
  if (force) return force
  const os = require('os')
  const ifaces = os.networkInterfaces()
  // Use WLAN first, not the VMware Network Adapter VMnet8
  let firstDetectKey=['WLAN']
  for(let key of firstDetectKey){
    for (const details of ifaces[key]) {
      if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
        return details.address
      }
    }
  }
  for (const key in ifaces) {
    if(firstDetectKey.includes(key))continue
    for (const details of ifaces[key]) {
      if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
        return details.address
      }
    }
  }
  return '0.0.0.0'
}
