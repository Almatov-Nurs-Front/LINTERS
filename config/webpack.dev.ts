import merge from 'webpack-merge';
import config from './webpack.common';
import { Configuration } from 'webpack';
import { ServerConfiguration } from 'webpack-dev-server';
import { WEBPACK_PATHS as PATHS } from './utils';


const devConfig: Configuration & { devServer: ServerConfiguration } = {
  mode: 'development',
  devtool: 'source-map',
  stats: 'errors-warnings',
  devServer: {
    port: 3000,
    // open: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    compress: true,
    hot: true,
    static: {
      directory: PATHS.dist
    }
  },
};

export default merge<Configuration>(config, devConfig);
