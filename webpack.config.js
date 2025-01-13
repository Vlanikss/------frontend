const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { Template } = require('webpack');
const path = require("path");



module.exports = {
  plugins: [new MiniCssExtractPlugin()
  ],
  
  mode: "development",
 entry: "./src/index.js",
 output: {
   filename: "main.js",
 },
 devServer: {
  static: {
    directory: path.join(__dirname, "dist"),
  },
  port:1488,
},
stats: {
 children: false,
 modulesSpace: 0,
},
  
  module: {
    rules: [
      { test: /\.css$/,
       use: [MiniCssExtractPlugin.loader, 'css-loader'] },

        {test: /\.pug$/,
				loader: 'pug-loader',
				options: {
				pretty: true
       }}
    ]
  },
  optimization: {
   
  }
  
};
