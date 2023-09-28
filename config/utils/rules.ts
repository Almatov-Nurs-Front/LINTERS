import { loader as style_loader } from 'mini-css-extract-plugin';
import { WEBPACK_PATHS as PATHS } from './paths';


export const rules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.(png|jpe?g|svg|gif)$/i,
    loader: 'file-loader',
    options: {
      name: `${PATHS.static}/media/[name].[hash].[ext]`
    },
  },
  {
    test: /\.css$|\.s[ac]ss$/,
    use: [
      style_loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[path]-[name]__[local]--[hash:base64:5]',
          },
        }
      },
      'sass-loader',
    ],
  },
];
