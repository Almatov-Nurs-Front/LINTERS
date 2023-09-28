// Modules
import webpack from 'webpack';
// Config
import config from '../webpack.dev';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// Utils
import { getTsConfAlias, clearConsole } from '../utils';
import { devLog } from '../utils/devLog';


// Webpack options
const compiler = webpack(config);
const devServer = new WebpackDevServer(config.devServer, compiler);

// On start
devServer.start().then(() => {
  clearConsole();
  getTsConfAlias();
});

// On compile
compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', (compilation) => {
  HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
    'CustomHtmlWebpackPlugin',
    (_, callback) => {
      clearConsole();
      devLog();
      callback();
    }
  );
});

// On exit
['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, () => {
    devServer.stop().then(() => {
      devServer.close();
      process.exit();
    });
  });
});
