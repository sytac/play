import { dirname } from 'path'
import gulp from 'gulp'
import gulpChanged from 'gulp-changed'
import gulpMicromatch from 'gulp-micromatch'
import gulpSaneWatch from 'gulp-sane-watch'
import gulpUtil from 'gulp-util'
import rimraf from 'rimraf'
import { map } from 'prelude-ls'
import { parallel } from 'async'
import gulpDebug from 'gulp-debug'
import handleError from '../lib/handleError'
import log from '../lib/log'

function sourceFilter(x) {
  switch (false) {
    case !x.match(/\.gif$/):  return false
    case !x.match(/\.jpg$/):  return false
    case !x.match(/\.png$/):  return false
    case !x.match(/\.svg$/):  return false
    case !x.match(/\.less$/): return false
    case !x.match(/\.ls$/):   return false
    case !x.match(/\.js$/):   return false
    default:                  return true
  }
}

gulp.task('copy:compile', cb => {
  const sourcePaths = [{
    sourcePath: "src/**/*",
    targetDirectoryPath: "build"
  }]

  const copyPath = curry$((path, cb) => {
    gulp.src(path.sourcePath)
      .pipe(gulpMicromatch(sourceFilter, {
        dot: true,
        extglobs: true
      }))
      .pipe(gulp.dest(path.targetDirectoryPath))
      .on('end', () => {
        gulpUtil.log('copy:compile', path.sourcePath)

        cb()
      })
  })

  parallel(map(copyPath, sourcePaths), error => {
    if (error) {
      return cb(error)
    }

    cb()
  })
})

gulp.task('copy:watch', cb => {
  const debounce = 300
  const sourceDirectoryPath = "src"
  const sourcePath = "src/**/*"
  const targetDirectoryPath = "build"

  gulpSaneWatch(sourcePath, {
    debounce
  }, sourceFilePath => {
    sourceFilePath = `${sourceDirectoryPath}/${sourceFilePath}`
    const targetFilePath = dirname(sourceFilePath.replace(sourceDirectoryPath, targetDirectoryPath))

    if (sourceFilter(sourceFilePath)) {
      gulp.src(sourceFilePath)
        .pipe(gulp.dest(targetFilePath))
        .pipe(log.file('copy:watch'))
    }
  })

  cb()
})

function curry$(f, bound){
  let context

  const _curry = args => f.length > 1 ? function(){
    const params = args ? args.concat() : []
    context = bound ? context || this : this
    return params.push(...arguments) <
    f.length && arguments.length ?
      _curry.call(context, params) : f.apply(context, params)
  } : f

  return _curry()
}
