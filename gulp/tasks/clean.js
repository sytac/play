import gulp from 'gulp'
import gulpUtil from 'gulp-util'
import rimraf from 'rimraf'
import { isType, each, map } from 'prelude-ls'
import { parallel } from 'async'
import handleError from '../lib/handleError'

function removePath(path) {
  return function(cb) {
    rimraf(path, error => {
      if (error) {
        return cb(error)
      }

      gulpUtil.log('clean', `Cleaned \`${path}\`.`)

      cb()
    })
  }
}

function clean(cb) {
  parallel(map(removePath, [ "build/*", ".tmp/*" ]), error => {
    if (error) {
      return cb(error)
    }

    cb()
  })
}

gulp.task('clean', clean)
