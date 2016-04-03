module.exports = {
  entry: getEntrySources(['./src/script/entry.js']),
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'build/bundle.js'
  },
  devtool: 'eval',
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
        include: /src/,
        loaders: [
          {
            test: /\.less$/,
            include: /src/,
            loaders: [
              'style',
              'css',
              'less'
            ]
          }
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

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}