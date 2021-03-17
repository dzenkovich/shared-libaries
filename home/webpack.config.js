const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require("webpack").container
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const webpack = require('webpack')
const fs = require('fs')

module.exports = {
  entry: 'index',
  output: {
    publicPath: "auto",
    // filename: 'build/[name].js',
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());

      if (fs.existsSync("./setupProxy.js")) {
        // This registers user provided middleware for proxy reasons
        require("./setupProxy.js")(app);
      }
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'home',
      remotes: {
        tracking: "tracking@http://localhost:3001/tracking.js",
      },
      shared: {
        'react': { singleton: true },
        'react-dom': { singleton: true },
        '@material-ui/core': { singleton: true },
        '@material-ui/styles': { singleton: true },
        '@material-ui/icons': { singleton: true }
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Shared Modules POC',
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}