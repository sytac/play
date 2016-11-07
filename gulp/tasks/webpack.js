import WebpackDevServer from 'webpack-dev-server'
import WriteFilePlugin from 'write-file-webpack-plugin'
import gulp from 'gulp'
import gulpUtil from 'gulp-util'
import handleError from '../lib/handleError'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config'

gulp.task('webpack:compile', cb => {
  const config = Object.assign({}, webpackConfig)

  webpack(config, (e, stats) => {
    if (e) {
      throw new gulpUtil.PluginError('webpack:compile', e)
    }

    gulpUtil.log('webpack:compile', stats.toString({
      colors: true
    }))

    cb()
  })
})

gulp.task('webpack:dev-server', cb => {
  const config = Object.assign({}, webpackConfig)

  config.devTool = '#inline-source-map'
  config.debug = true

  // Add a plugin that writes the bundle file to disk.
  config.plugins.push(WriteFilePlugin())

  const compiler = webpack(config)

  const devServerOptions = {
    //hot: true,
    proxy: {
      '*': 'http://0.0.0.0:3000'
    },
    stats: {
      colors: true
    },
    noInfo: true,
    quiet: false
  }


  if (config.output.publicPath) {
    devServerOptions.publicPath = config.output.publicPath
  }

  if (config.contentBase) {
    devServerOptions.contentBase = config.contentBase
  }

  const devServer = new WebpackDevServer(compiler, devServerOptions)

  devServer.listen(8080, '0.0.0.0', e => {
    if (e) {
      throw new gulpUtil.PluginError('webpack:dev-server', e)
    }

    gulpUtil.log("http://0.0.0.0:8080/webpack-dev-server/index.html")

    cb()
  })
})
