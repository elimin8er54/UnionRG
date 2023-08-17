const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['core-js/stable', './src/client/index.tsx'],

  output: {
    path: path.join(__dirname, outputDirectory),
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].bundle.js',
    publicPath: '/',

    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(mp4|jpe?g|png|woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'file-loader?limit=100000',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    inline: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')],
    publicPath: '/',
    port: 3000,
    proxy: {
      '/mls': {
        changeOrigin: true,
        target: 'http://localhost:3001',

        secure: false,
      },
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:3001',

        secure: false,
      },
    },
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(['src/server/dist']),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CopyPlugin({
      patterns: [{ from: 'other', to: './' }],
    }),
  ],
};
