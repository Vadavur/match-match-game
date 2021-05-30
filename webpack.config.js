import CopyPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

function runDevServer(isDev) {
  if (isDev) {
    return {
      devServer: {
        open: true,
        hot: true,
        port: 8080,
        contenrBase: path.join(dirName, 'public'),
      },
    };
  }
  return {};
}

function runEsLintPlugin(isDev) {
  if (!isDev) {
    return [new ESLintPlugin({ extensions: ['ts', 'js'] })];
  }
  return [];
}

export default ({ develop }) => {
  return {
    mode: develop ? 'development' : 'production',
    devtool: develop ? 'inline-source-map' : false,
    entry: { app: './src/index.ts' },
    output: {
      path: path.resolve(dirName, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?:eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/images/favicon.ico',
      }),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new CopyPlugin({ patterns: [{ from: './public/**/*' }] }),
      new CleanWebpackPlugin.CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      ...runEsLintPlugin(develop),
    ],
    ...runDevServer(develop),
  };
};
