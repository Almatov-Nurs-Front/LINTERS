import merge from 'webpack-merge';
import config from './webpack.common';
import { Configuration } from 'webpack';


const prodConfig: Configuration = {
  mode: 'production',
  devtool: 'source-map',
};

export default merge(config, prodConfig);
