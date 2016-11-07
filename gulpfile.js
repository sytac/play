require('babel-register')
//require('babel-polyfill')

var gulp = require('gulp')
var seq = require('run-sequence')

require('./gulp/tasks/babel')
require('./gulp/tasks/clean')
require('./gulp/tasks/copy')
require('./gulp/tasks/images')
require('./gulp/tasks/less')
require('./gulp/tasks/minify')
require('./gulp/tasks/mocha')
require('./gulp/tasks/server')
require('./gulp/tasks/webpack')

gulp.task('compile', function(cb) {
  seq(
    [
      'babel:compile',
      'copy:compile',
      'images:compile',
      'less:compile',
    ],

    cb
  )
})

gulp.task('watch', function(cb) {
  seq(
    [
      'babel:watch',
      'copy:watch',
      'images:watch',
      'less:watch',
      'mocha:watch',
    ],

    cb
  )
})

gulp.task('develop', function(cb) {
  seq(
    'clean',
    'compile',
    'mocha:istanbul',

    [
      'watch',
      'server:run',
      'webpack:dev-server',
    ],

    cb
  )
})

gulp.task('production', function(cb) {
  seq(
    'clean',
    'compile',
    'webpack:compile',
    'server:run',

    /*
    [
      'html:minify',
      'javascript:minify',
    ],
    */

    cb
  )
})
