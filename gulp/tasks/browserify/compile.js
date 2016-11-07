import { exists }  from 'fs'
import gulpUtil from 'gulp-util'

import common from './common'
//import handleError from '../../lib/handleError'

export default function compile(cb) {
  const bundleEntryFilename = "loopback-initialize.js"
  const bundleTargetFilename = "loopback-app.bundle.js"
  const sourceDirectoryPath = "build/client/js"
  const targetDirectoryPath = "build/client"
  const bundleEntryFilePath = `${sourceDirectoryPath}/${bundleEntryFilename}`

  exists(bundleEntryFilePath, doesExist => {
    if (!doesExist) {
      gulpUtil.log('browserify:compile', `Warning: Path does not exist ${bundleEntryFilePath}`)
      cb()
    }

    const bundle = common.getBundle(targetDirectoryPath, bundleEntryFilePath)

    common.runBundle(bundle, bundleTargetFilename, targetDirectoryPath, cb)
  })
}
