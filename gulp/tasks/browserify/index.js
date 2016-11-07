import gulp from 'gulp';

import compile from './compile';
import watch   from './watch';

gulp.task('browserify:compile', compile);
gulp.task('browserify:watch', watch);
