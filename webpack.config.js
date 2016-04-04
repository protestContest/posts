var fs = require('fs');

module.exports = {
  entry: getEntrySources(),
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'build/[name].js'
  },
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.less$/,
        loaders: [
          'style',
          'css',
          'less'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        loaders: [
          'img'
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
        ]
      }
    ]
  }
};

function getEntrySources() {
  var entries = {};

  fs.readdirSync('./src/scripts/pages').forEach(function(page) {
    var name = page.slice(0, -8);
    entries[name] = ['./src/scripts/pages/' + page];

    if (process.env.NODE_ENV !== 'production') {
      entries[name].push('webpack-dev-server/client?http://localhost:8080');
      entries[name].push('webpack/hot/only-dev-server');
    }

  });

  return entries;
}