const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// make sure you require “webpack”
const webpack = require('webpack');

const mode = "development";

module.exports = {
  mode: mode,
  devtool: "source-map",
  resolve: {
    alias: {
      CssFolder: path.resolve(__dirname, 'src/stylesheets/'),
      JsFolder: path.resolve(__dirname, 'src/javascripts/')
    },
  },
  entry: {
    index: "./src/javascripts/index.js",
  },
  output: {
    filename: mode === 'production' ? "js/[name]-[contenthash].js" : 'js/[name].js',
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: 'images/[name][ext][query]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      }, //JS
      {
        test: /\.css$/i,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      overrideBrowserslist: ['last 3 versions', 'ie >9']
                    },
                  ],
                ],
              },
            },
          },
        ],
      }, //CSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      overrideBrowserslist: ['last 3 versions', 'ie >9']
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader'
        ],
      }, //SCSS
      {
        test: /(png|jpg|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: mode === "production" ? "[name]-[hash:7].[ext]" : "[name].[ext]"
        }
      } //Images, Fonts, SVG
    ]
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: mode === 'production' ? "styles/[name]-[contenthash].css" : 'styles/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // filename: './pages/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    })
  ]
}
