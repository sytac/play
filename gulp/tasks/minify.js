import gulp from 'gulp'
import gulpChanged from 'gulp-changed'
import gulpHtmlmin from 'gulp-htmlmin'
import gulpUglify from 'gulp-uglify'
import log from '../lib/log'

gulp.task('html:minify', cb => {
  const sourcePath = "build/client/*.html"
  const targetDirectoryPath = "build/client"

  return gulp.src(sourcePath)
    .pipe(gulpHtmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeCDATASectionsFromCDATA: true,
      removeCommentsFromCDATA: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true
    }))
    .pipe(gulp.dest(targetDirectoryPath))
    .pipe(log.file('html:minify'))
})

gulp.task('javascript:minify', cb => {
  const sourcePath = "src/client/js/app.bundle.js"
  const targetDirectoryPath = "build/client/js"

  return gulp.src(sourcePath)
    .pipe(gulpUglify())
    .pipe(gulp.dest(targetDirectoryPath))
    .pipe(log.file('javascript:minify'))
})
