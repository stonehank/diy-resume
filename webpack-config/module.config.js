const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'
const dirVars = require('./base/dir-vars.config.js')
const { publicPath } = require('./config')

function parseCss(preLoader=1){
  return [
    { loader:MiniCssExtractPlugin.loader },
    {
      loader: 'css-loader',
      options: {
        url: true,
        importLoaders: preLoader,
        sourceMap: isDev
      }
    },
    // All the rules in postcss.config.js
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        config: {
          ctx: {
            'postcss-preset-env': {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3
            },
            'postcss-flexbugs-fixes': {},
            cssnano: {},
          }
        }
      }
    },
  ]
}

module.exports= {
  rules: [
    // top level, https://github.com/vuejs/vue-loader/issues/1204#issuecomment-375739662
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      oneOf: [
        {
          test: /\.(js|jsx)$/,
          include: dirVars.srcRootDir,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                babelrc: true,
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                fix:true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: parseCss()
        },
        {
          test: /\.scss$/,
          use: parseCss(2).concat({loader: 'sass-loader'})
        },
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                fiber: require('fibers')
              }
            }
          ]
        },
        {
          test: /\.ejs$/,
          include: dirVars.srcRootDir,
          exclude: /node_modules/,
          loader: 'ejs-loader',
        },
        {
          test: /\.(png|jpe?g|jfif|gif)$/i,
          include: dirVars.assetsDir,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,  // https://github.com/vuejs/vue-loader/issues/1612
                limit: isDev ? 0 : 4096,
                name: 'assets/images/[name]-[contenthash:8].[ext]',
                publicPath: isDev ? '/' : (publicPath==='' ? '/' : publicPath)
              },
            },
          ],
        },

        {
          test: /\.(woff|woff2|eot|ttf)$/i,
          include: dirVars.assetsDir,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/font/[name]-[contenthash:8].[ext]',
                publicPath: isDev ? '/' : (publicPath==='' ? '/' : publicPath)
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
        },
        // {
        //   test: /\.svg$/i,
        //   include: dirVars.assetsDir,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: 'assets/vector/[name]-[contenthash:8].[ext]',
        //         publicPath: isDev ? '/' : (publicPath==='' ? '/' : publicPath)
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.ico$/i,
          include: dirVars.assetsDir,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/images/[name].[ext]',
                publicPath: isDev ? '/' : (publicPath==='' ? '/' : publicPath)
              },
            },
          ],
        },
        {
          loader: 'file-loader',
          exclude: [/\.(js|mjs|jsx|ts|tsx|vue)$/i, /\.html$/i, /\.json$/i],
          options: {
            name: 'static/[name].[contenthash:8].[ext]',
            publicPath: isDev ? '/' : (publicPath==='' ? '/' : publicPath)
          },
        },
      ]
    }
  ],
}
