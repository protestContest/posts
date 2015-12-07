var webpack = require('webpack');
var ET = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ET.extract('css!less')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true)
      }
    }),
    new ET('style.css')
  ]
};