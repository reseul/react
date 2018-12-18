const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

import config from '../config'

const { paths } = config
const { __DEV__ } = config.compiler_globals

const webpackConfig: any = {
  mode: __DEV__ ? 'development' : 'production',
  entry: {
    app: paths.simpleSrc('index'),
    vendor: config.compiler_vendor,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          useCache: true,
          configFileName: paths.base('build/tsconfig.simple.json'),
          errorsAsWarnings: __DEV__,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@stardust-ui/react': paths.src(),
      src: paths.src(),
      docs: paths.base('simple'),
      'package.json': paths.base('package.json'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Stardust Sample',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'packedindex.js',
    path: config.compiler_simple_output_path,
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
}

export default webpackConfig
