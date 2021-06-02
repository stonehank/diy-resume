module.exports = ({ file, options, env }) => {
  return {
    plugins: {
      'postcss-preset-env': env === 'production' ? options['postcss-preset-env'] : false,
      cssnano: env === 'production' ? options.cssnano : false,
      'postcss-flexbugs-fixes': options['postcss-flexbugs-fixes']
    }
  }
}
