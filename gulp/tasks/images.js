import { dirname } from 'path'
import { exists } from 'fs'

import gulp from 'gulp'
import gulpImagemin from 'gulp-imagemin'
import gulpSaneWatch from 'gulp-sane-watch'
import gulpUtil from 'gulp-util'
import pngquant from 'imagemin-pngquant'

import log from '../lib/log'

gulp.task('images:compile', cb => {
  const sourcePath = "src/**/*.@(gif|jpg|png|svg)"
  const targetDirectoryPath = "build"

  return gulp.src(sourcePath)
    .pipe(gulpImagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewbox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(targetDirectoryPath))
    .pipe(log.file('images:compile'))
})

gulp.task('images:watch', cb => {
  const debounce = 300
  const sourcePath = "src/**/*.@(gif|jpg|png|svg)"
  const targetDirectoryPath = "build"

  gulpSaneWatch(sourcePath, {
    debounce
  }, sourceFilePath => {
    sourceFilePath = `${sourceDirectoryPath}/${sourceFilePath}`
    const targetFilePath = dirname(sourceFilePath.replace(sourceDirectoryPath, targetDirectoryPath))

    gulp.src(sourceFilePath)
      .pipe(gulpImagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewbox: false
        }],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(targetFilePath))
      .pipe(log.file('images:watch'))
  })

  cb()
})
