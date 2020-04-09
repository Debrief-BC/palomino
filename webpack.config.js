const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index: './src/main'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    },
    {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', "less-loader"]
    },
    {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false
        }
      }]
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/socket.io/': {
        target: 'http://127.0.0.1:8080/socket.io/',
        changeOrigin: true
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
