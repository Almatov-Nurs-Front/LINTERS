// Modules
import path from 'path';
import dotenv from 'dotenv';
import { Configuration, DefinePlugin } from 'webpack';
// PLugins
import WebpackBarPlugin from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
// Utils
import { rules, alias, extensions, WEBPACK_PATHS as PATHS } from './utils';


const hashName = '[name].[contenthash:8]';
const hashChunkName = '[id].[chunkhash:8].chunk';

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    path: PATHS.build,
    filename: `${PATHS.static}/js/${hashName}.js`,
    chunkFilename: `${PATHS.static}/js/${hashChunkName}.js`,
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate(info: { [ key: string ]: string }) {
      return path.relative('./src', info.absoluteResourcePath);
    },
    publicPath: '/',
  },
  module: { rules },
  resolve: { alias, extensions },
  infrastructureLogging: { level: 'none' },
  plugins: [
    new WebpackBarPlugin({
      name: require('../package.json').name || 'Webpack',
      color: dotenv.config().parsed?.BARCOLOR || '#5D3FD3',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.dist}/index.html`,
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: `${PATHS.static}/css/${hashName}.css` }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      filename: `${PATHS.static}/js/${hashChunkName}.js`,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
      }
    },
  },
};

export default config;
