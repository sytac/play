const path = require('path');

const webpack = require('webpack');

const entryFileName = 'app.js';
const bundleFileName = 'app.bundle.js';
const contentBaseDirectoryPath = path.join(__dirname, 'build/client');
const javascriptDirectoryPath = path.join(contentBaseDirectoryPath, 'js');

const webpackServiceURI = `http://0.0.0.0:8080`;
const applicationServiceURI = `http://0.0.0.0:3000`;

const options = {
  contentBase: contentBaseDirectoryPath,

  entry: {
    app: [
      `${javascriptDirectoryPath}/${entryFileName}`,
    ]
  },

  output: {
    publicPath: '/',
    path: contentBaseDirectoryPath,
    filename: bundleFileName,
  },

  devtool: '#inline-source-map',

  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.json$/, loader: 'json' },
      { test: /\.svg$/, loader: 'babel?presets[]=es2015,presets[]=react!svg-react' },
    ]
  },

  plugins: [],
};

if (process.env.NODE_ENV === 'develop') {
  options.entry.app = [
    //`react-hot-loader/patch`,
    `webpack-dev-server/client?${webpackServiceURI}`,
    //`webpack/hot/only-dev-server`,
  ].concat(options.entry.app)

  //options.plugins.push(webpack.HotModuleReplacementPlugin())
}

module.exports = options;
