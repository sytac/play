import { createReadStream } from 'fs'
import { dirname } from 'path'
import gulp from 'gulp'
import gulpBabel from 'gulp-babel'
import gulpSaneWatch from 'gulp-sane-watch'
import gulpUtil from 'gulp-util'
import handleError from '../lib/handleError'
import log from '../lib/log'

gulp.task('babel:compile', cb => {
  const sourcePath = "src/**/*.js"
  const targetDirectoryPath = "build"

  return gulp.src(sourcePath)
    .pipe(gulpBabel())
    .on('error', error => {
      handleError('babel:compile', error)

      cb()
    })
    .pipe(gulp.dest(targetDirectoryPath))
    .pipe(log.file('babel:compile'))
})

gulp.task('babel:watch', cb => {
  const debounce = 300
  const sourceDirectoryPath = "src"
  const sourcePath = "src/**/*.js"
  const targetDirectoryPath = "build"

  gulpSaneWatch(sourcePath, {
    debounce
  }, sourceFilePath => {
    sourceFilePath = `${sourceDirectoryPath}/${sourceFilePath}`
    const targetFilePath = dirname(sourceFilePath.replace(sourceDirectoryPath, targetDirectoryPath))

    gulp.src(sourceFilePath)
      .pipe(gulpBabel())
      .on('error', error => {
        handleError('babel:compile', error)

        cb()
      })
      .pipe(gulp.dest(targetFilePath))
      .pipe(log.file('babel:watch'))
  })

  cb()
})
