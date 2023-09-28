// Modules
import ip from 'ip';
import chalk from 'chalk';
// Config modules
import webpack from 'webpack';
import config from '../webpack.common';
import devConfig from '../webpack.dev';
// Webpack plugins
import WebpackBarPlugin from 'webpackbar';


const compiler = webpack(devConfig);

const port = Number(devConfig.devServer?.port) || 3000;
// @ts-ignore
const color = config.plugins?.find((plugin) => plugin instanceof WebpackBarPlugin)?.options?.color;

const text = (str: string, color: string) => chalk.bold(chalk.hex(color)(str));

export function devLog() {
  const isDev = devConfig.mode === 'development';

  if (isDev) {
    const project_path = compiler.options.context;
    const split_path = project_path?.split('/');
    const project = `${split_path?.slice(0, -1).join('/')}/${chalk.bold(split_path?.at(-1))}`;

    console.log(chalk.green.bold('Compiled successfully!\n'));
    console.log(text('  Project path:           ', color), chalk.underline(project));
    console.log(text('  Local:                  ', color), chalk.underline(`http://localhost:${chalk.bold(port)}`));
    console.log(text('  On Your Network (IPv4): ', color), chalk.underline(`http://${ip.address()}:${chalk.bold(port)}\n`));
    console.log(`Для оптимизации проекта\nможете выполнить команду: ${chalk.cyan.bold('npm run build')}.\n`);
  }
}

export function loadingLog() {

}
