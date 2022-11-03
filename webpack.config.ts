import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { ProvidePlugin, Configuration, DefinePlugin } from 'webpack'
import 'webpack-dev-server'
import { entryPoints, markdownEntryPoints, MdBundleName, ownBundles, ownEntryPoints } from './entryPoints'
import { markdown, MarkdownPageName } from './src/md/markdown'

type Arg1 = {
  WEBPACK_SERVE?: boolean
}

type Mode = Configuration['mode']

type Arg2 = {
  mode?: Mode
}

function config(_: Arg1, { mode }: Arg2): Configuration {
  return {
    mode: mode ?? 'development',
    devtool: 'cheap-source-map',
    entry: entryPoints,
    output: outputOptions(mode),
    module: moduleOptions(),
    resolve: resolveOptions(),
    plugins: pluginOptions(mode),
    optimization: optimizationOptions(mode),
    devServer: {
      client: {
        overlay: false,
      },
    },
  }
}

function outputOptions(mode: Mode): Configuration['output'] {
  return {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.bundle.js',
    path: path.resolve(__dirname, mode === 'development' ? 'docs' : 'docs/v2'),
  }
}

function moduleOptions(): Configuration['module'] {
  return {
    rules: [
      { test: /\.m?js$/, resolve: { fullySpecified: false } },
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif)$/, use: [{ loader: 'file-loader' }] },
      { test: /\.(md|yaml)$/i, use: 'raw-loader' },
    ],
  }
}

function resolveOptions(): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    fallback: {
      path: require.resolve('path-browserify'),
      process: require.resolve('process'),
      fs: false,
      url: false,
      perf_hooks: false,
    },
  }
}

function pluginOptions(mode: Mode): Configuration['plugins'] {
  return [
    new DefinePlugin({ 'process.env.MODE': JSON.stringify(mode) }),
    ...(mode === 'development' ? [] : [new CleanWebpackPlugin()]),
    ...ownBundles.map((bundle) => {
      return new HtmlWebpackPlugin({
        template: path.resolve('src/index.html'),
        chunks: [bundle, ...ownEntryPoints[bundle].dependOn],
        filename: `${bundle}.html`,
      })
    }),
    ...Object.keys(markdown).map((md) => {
      const page = md as MarkdownPageName
      const bundle: MdBundleName = `documentation-${page}`
      return new HtmlWebpackPlugin({
        template: path.resolve('src/index.html'),
        chunks: [bundle, ...markdownEntryPoints[bundle].dependOn],
        filename: `documentation/${page}.html`,
      })
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
  ]
}

function optimizationOptions(mode: Mode): Configuration['optimization'] {
  return {
    minimize: mode === 'production',
  }
}

export default config
