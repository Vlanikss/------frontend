const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development', // Режим разработки
  entry: './src/index.js', // Входной файл
  output: {
    filename: 'bundle.js', // Название итогового JS файла
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
  },
  devtool: 'source-map', // Генерация карт исходников для отладки
  devServer: {
    static: path.join(__dirname, 'dist'), // Папка с файлами статики
    port: 9000, // Порт для сервера
    hot: true, // Включить горячую перезагрузку
    open: true, // Открывать браузер автоматически
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Ваш HTML-шаблон
      filename: 'index.html', // Название выходного файла
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/img'), to: 'src/img' },
      ],
    }),
  ],
  module: {
    rules: [
      // Правило для обработки CSS
      {
        test: /\.css$/i, // Для файлов с расширением .css
        use: [
          'style-loader', // Вставка CSS в DOM через <style> теги
          'css-loader',   // Обработка CSS файлов
        ],
      },
      // Правило для обработки SCSS
      {
        test: /\.scss$/i, // Для файлов с расширением .scss
        use: [
          'style-loader', // Вставка CSS в DOM через <style> теги
          'css-loader',   // Обработка CSS файлов
          'sass-loader',  // Компиляция SCSS в CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Для обработки изображений
        type: 'asset/resource', // Переносит файлы в выходную папку
      },
    ],
  },
};
