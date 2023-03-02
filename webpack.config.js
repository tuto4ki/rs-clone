const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
 
const baseConfig = {
    entry: {
      app: path.resolve(__dirname, './src/index'),
    },
    mode: 'production',
    output: {
      filename: 'index.bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.ts$/i,
          use: 'ts-loader',
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
      new ESLintPlugin({
        extensions: 'ts',
      })
    ]
};

module.exports = ({ mode }) => {
  const isDevelopmentMode = mode === 'development';
  const envConfig = isDevelopmentMode ? require('./webpack.dev.config') : require('./webpack.prod.config');
  return merge(baseConfig, envConfig);
};