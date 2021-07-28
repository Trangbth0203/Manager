const path = require('path')
// const webpack = required('webpack')

module.exports = {
  // webpack: (config) => {
  //   config.plugins.push(new webpack.EnvironmentPlugin(process.env))
  //   return config
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
