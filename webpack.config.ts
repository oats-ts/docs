import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { ProvidePlugin, Configuration, DefinePlugin } from 'webpack'
import 'webpack-dev-server'
import { entryPoints, markdownEntryPoints, mainEntryPoints } from './entryPoints'
import { mainPages } from './src/mainPages'
import { markdownPages } from './src/markdownPages'
import { PageDescriptor } from './src/types'

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

function createMetaTags(page: PageDescriptor): Record<string, { name: string; content: string }> {
  return {
    description: { name: 'description', content: page.description },
    keywords: { name: 'keywords', content: 'openapi,oats,jsonschema,json-schema,yaml,json,typescript,codegen' },
    'og:title': { name: 'og:title', content: page.name },
  }
}

function pluginOptions(mode: Mode): Configuration['plugins'] {
  return [
    new DefinePlugin({ 'process.env.MODE': JSON.stringify(mode) }),
    ...(mode === 'development' ? [] : [new CleanWebpackPlugin()]),
    ...Object.values(mainPages).map((page) => {
      return new HtmlWebpackPlugin({
        template: path.resolve('src/index.html'),
        chunks: [page.bundle, ...mainEntryPoints[page.bundle].dependOn],
        filename: page.bundle === 'notFound' ? '404.html' : `${page.bundle}.html`,
        title: page.name,
        meta: createMetaTags(page),
      })
    }),
    ...Object.values(markdownPages).map((page) => {
      return new HtmlWebpackPlugin({
        template: path.resolve('src/index.html'),
        chunks: [page.bundle, ...markdownEntryPoints[page.bundle].dependOn],
        filename: `documentation/${page.md}.html`,
        title: page.name,
        meta: createMetaTags(page),
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
