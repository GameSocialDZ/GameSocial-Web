const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

//const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const cssDev = ['style-loader','css-loader','less-loader'];
// const cssProd = ExtractTextPlugin.extract({
//   fallback: 'style-loader',
//   use: ['css-loader', 'less-loader'],
//   publicPath: 'public'
// });

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {

};

module.exports = {
  watch: true,
  entry: SRC_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: PUBLIC_DIR,
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(css|less|sass)$/,
        use: ['css-loader', 'less-loader', 'style-loader','sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000&name=/ui/assets/fonts/[name].[ext]',
        exclude:[path.resolve(__dirname, "/src/ui/assets/images")]
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: [
          'file-loader?name=/ui/assets/img/[name].[ext]', //Sames image with Original name/ or hash to img dir
          // 'image-webpack-loader', // Optimize the image file size
        ],
        exclude:[path.resolve(__dirname, "/src/ui/assets/fonts")]
      },
      {
        test: /\.(webm|mp4)$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: "index.html"
    })
  ],
};