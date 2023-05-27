const path = require("path");
// const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// const StylelintPlugin = require('stylelint-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 提取 CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 壓縮 CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  // mode: 'development',
  // mode: 'none',
  entry: "./index.js",
  output: {
    filename: "[name].[hash].js",
    // path: path.resolve(__dirname, './'),
    // 在生成文件之前先清空 output 目錄
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: 'index.html',
      template: "D:/htdocs/8bx.com/www.8bx.com/contract/exchange.html",
      filename: "index.[contenthash].html",
      cache: true,
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    // new StylelintPlugin({
    //   // 正则匹配想要lint监测的文件
    //   configFile: '.stylelintrc.json',
    //   files: ['assets/styles/*.scss'],
    //   fix: true,
    // }),
  ],
  module: {
    rules: [
      // js
      // {
      //   /**
      //    * test 通常是使用一段 regex(正則表達式)
      //    * 要是有檔名符合這段 regex，那他就會使用 use 裡面指定的 loader
      //    */
      //   test: /\.m?js$/,
      //   // 排除 node_modules 與 bower_components 底下資料
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       // 配置 Babel 解析器
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
      // css
      {
        test: /\.s[ac]ss$/i,
        use: [
          // mode === 'production'
          //   ? MiniCssExtractPlugin.loader
          //   : 'style-loader',
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          // 將 Sass 編譯成 CSS
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            // 移除所有 console
            drop_console: true,
          },
        },
        // sourceMap: true,
        // parallel: true
      }),
      // 壓縮 CSS
      new CssMinimizerPlugin(),
    ],
    minimize: true,
    // 啟動標記功能
    // 它會將每個模塊中沒有被使用過的導出內容標記為 unused，當生成產物時，被標記的變量對應的導出語句會被刪除
    usedExports: true,
  },
};
