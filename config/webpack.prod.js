const webpack = require('webpack')
const path = require('path')
const { AngularCompilerPlugin } = require('@ngtools/webpack')
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin

module.exports = {
  mode: 'production',
  entry: {
    polyfills: './src/polyfills.ts',
    app: './src/main.ts'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'initial'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: false
        }
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: {
          loader: '@ngtools/webpack'
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.xlf$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.resolve('src'),
      {}
    ),
    new webpack.DefinePlugin({
      ENV_PRODUCTION: true
    }),
    new AngularCompilerPlugin({
      mainPath: 'src/main.ts',
      i18nOutFile: path.join('src', 'i18n', 'messages.xlf'),
      i18nOutFormat: 'xlf',
      locale: 'en',
      sourceMap: true,
      tsConfigPath: 'tsconfig.json',
      skipCodeGeneration: false,
      compilerOptions: {}
    }),
    new PurifyPlugin()
  ]
}
