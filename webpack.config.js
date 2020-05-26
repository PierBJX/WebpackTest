const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    first: './src/first/main.ts',
    second: './src/second/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    filename: '[name]/script.js', // name of the generated bundle
    publicPath: '/',
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
        },
      },
      // Style
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // Fonts & Images
      {
        test: /\.(woff(2)?|ttf|eot|jpg|png|svg|md)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(process.cwd(), 'src')],
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/first/index.html'),
      inject: true,
      chunks: ['first'],
      filename: 'first/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/second/index.html',
      inject: true,
      chunks: ['second'],
      filename: 'second/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/style.css',
      chunkFilename: '[name]/style.css',
    }),
  ],
};
