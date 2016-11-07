import gulpUtil from 'gulp-util'

export default function handleError(taskName, error) {
  const message = error.stack || error.message || error

  gulpUtil.log(taskName, `Error: ${message}`)
}
