const Webpack = require('Webpack');
const Path = require('path');

const outPath = Path.join(__dirname, './build/app');
const sourcePath = Path.join(__dirname, './src/app');

module.exports = {
  mode: 'development',
  entry: {
    index: Path.join(sourcePath, 'index.jsx'),
    vendor: ['react', 'react-dom']
  },
  devtool: 'source-map',
  target: 'web',
  output: {
    filename: '[name].bundle.js',
    path: outPath,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    mainFields: ['browser', 'main']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.NoEmitOnErrorsPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
