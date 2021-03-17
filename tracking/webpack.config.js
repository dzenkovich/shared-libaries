const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: 'index.jsx',
  output: {
    publicPath: "auto",
    // filename: 'build/[name].js',
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.mjs'],
  },
  module: {
    rules: [
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
    port: 3001,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'tracking',
      library: { type: "var", name: "tracking" },
      filename: "tracking.js",
      exposes: {
        './Tracking': './src/components/App'
      },
      shared: {
        'react': { singleton: true },
        'react-dom': { singleton: true },
        '@material-ui/core': { singleton: true },
        '@material-ui/styles': { singleton: true },
        '@material-ui/icons': { singleton: true }
      },
    }),
    new CleanWebpackPlugin(),
  ],
}