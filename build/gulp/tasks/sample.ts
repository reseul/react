import * as historyApiFallback from 'connect-history-api-fallback'
import * as express from 'express'
import { task, series } from 'gulp'
import * as rimraf from 'rimraf'
import * as webpack from 'webpack'
import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import * as WebpackHotMiddleware from 'webpack-hot-middleware'

import config from '../../../config'

const { paths } = config
const g = require('gulp-load-plugins')()
const { colors, log, PluginError } = g.util

// ----------------------------------------
// Clean
// ----------------------------------------

task('clean:sample', cb => {
  rimraf(paths.sampleDist(), cb)
})

// ----------------------------------------s
// Build
// ----------------------------------------

task('build:sample', cb => {
  const webpackConfig = require('../../webpack.config.sample').default
  const compiler = webpack(webpackConfig)

  compiler.run((err, stats) => {
    const { errors, warnings } = stats.toJson()

    log(stats.toString(config.compiler_stats))

    if (err) {
      log('Webpack compiler encountered a fatal error.')
      throw new PluginError('webpack', err.toString())
    }
    if (errors.length > 0) {
      log('Webpack compiler encountered errors.')
      throw new PluginError('webpack', errors.toString())
    }
    if (warnings.length > 0) {
      throw new PluginError('webpack', warnings.toString())
    }

    cb(err)
  })
})

// ----------------------------------------
// Serve
// ----------------------------------------

task('serve:sample', cb => {
  const app = express()
  const webpackConfig = require('../../webpack.config.sample').default
  const compiler = webpack(webpackConfig)

  app
    .use(
      historyApiFallback({
        verbose: false,
      }),
    )

    .use(
      WebpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: paths.sampleSrc(),
        hot: true,
        quiet: false,
        noInfo: true, // must be quiet for hot middleware to show overlay
        lazy: false,
        stats: config.compiler_stats,
      }),
    )

    .use(WebpackHotMiddleware(compiler))

    .use(express.static(paths.sampleDist()))

    .listen(config.sample_server_port, config.server_host, () => {
      log(
        colors.yellow('Server for Sample running at http://%s:%d'),
        config.server_host,
        config.sample_server_port,
      )
      cb()
    })
})

// ----------------------------------------
// Default
// ----------------------------------------

task('sample', series('build:sample', 'serve:sample'))
