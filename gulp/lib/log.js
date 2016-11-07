import { Transform } from 'stream'
import gulpUtil      from 'gulp-util'

class FileLogger extends Transform {
  constructor(options) {
    options.objectMode = true

    super(options)

    this.taskName = options.taskName
  }

  _transform(object, encoding, cb) {
    const fileName = object.history[0]
      .replace(object.base, '')

    gulpUtil.log(this.taskName, fileName)

    cb(null, object, encoding)
  }
}

function file(taskName) {
  return new FileLogger({ taskName })
}

export default {
  file
}
