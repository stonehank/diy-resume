const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const isDev = process.env.NODE_ENV === 'development'

module.exports={
  minimize: !isDev,
    minimizer: [new TerserJSPlugin({
  cache: true,
  parallel: true,
  terserOptions: {
    parse: {
      ecma: 8,
    },
    compress: isDev
      ? false
      : {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
    ie8: true,
    safari10: true
  }
}), new OptimizeCSSAssetsPlugin({
  parser: safePostCssParser,
})],
  splitChunks: {
  chunks: 'all',
    cacheGroups: {
    libs: {
      test: /node_modules/,
        name: 'libs',
        minChunks: 4,
        minSize: 0,
        priority: 30,
    },
    commons: {
      name: 'commons',
        enforce: true,
        minChunks: 4,
        minSize: 0,
        priority: 20,
    },
    vendors:false,
  default: false
  },
},
  runtimeChunk: {
    name: 'manifest'
  }
}
