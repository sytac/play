import { exists } from 'fs'

import LessPluginAutoprefix from 'less-plugin-autoprefix'
import gulp from 'gulp'
import gulpCssnano from 'gulp-cssnano'
import gulpLess from 'gulp-less'
import gulpSaneWatch from 'gulp-sane-watch'
import gulpUtil from 'gulp-util'
import lessPluginInlineUrls from 'less-plugin-inline-urls'

import log from '../lib/log'

gulp.task('less:compile', cb => {
  const sourceFilePath = "src/client/styles/app.less"
  const targetDirectoryPath = "build/client/css"

  exists(sourceFilePath, doesExist => {
    if (!doesExist) {
      gulpUtil.log(`Path \`${sourceFilePath}\` does not exist.`)
      cb()
    } else {
      gulp.src(sourceFilePath)
        .pipe(gulpLess({
          plugins: [
            new LessPluginAutoprefix({
              browsers: ["last 2 versions"]
            }), lessPluginInlineUrls
          ]
        }))
        .pipe(gulpCssnano())
        .pipe(gulp.dest(targetDirectoryPath))
        .pipe(log.file('less:compile'))
        .on('end', cb)
    }
  })
})

gulp.task('less:watch', cb => {
  const debounce = 300
  const sourceFilePath = "src/client/styles/app.less"
  const sourcePath = "src/client/styles/**/*.less"
  const targetDirectoryPath = "build/client/css"

  exists(sourceFilePath, doesExist => {
    if (!doesExist) {
      gulpUtil.log(`Path \`${sourceFilePath}\` does not exist.`)
    } else {
      gulpSaneWatch(sourcePath, {
        debounce
      }, () => {
        gulp.src(sourceFilePath)
          .pipe(gulpLess({
            plugins: [
              new LessPluginAutoprefix({
                browsers: ["last 2 versions"]
              }), lessPluginInlineUrls
            ]
          }))
          .pipe(gulpCssnano())
          .pipe(gulp.dest(targetDirectoryPath))
          .pipe(log.file('less:watch'))
      })
    }
  })

  cb()
})
