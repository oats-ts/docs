const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ProvidePlugin } = require('webpack')

module.exports = ({ WEBPACK_SERVE }, argv) => {
  return {
    entry: './src/index.tsx',
    devtool: 'cheap-source-map',
    mode: argv.mode ?? 'development',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'docs'),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(md|yaml)$/i,
          use: 'raw-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
      fallback: {
        path: require.resolve('path-browserify'),
        process: require.resolve('process'),
        fs: false,
        url: false,
        perf_hooks: false,
      },
    },
    plugins: [
      new CleanWebpackPlugin({
        dry: Boolean(WEBPACK_SERVE),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('src/index.html'),
      }),
      new ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      client: {
        overlay: false,
      },
    },
  }
}
