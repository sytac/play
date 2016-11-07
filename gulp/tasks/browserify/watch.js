import { exists } from 'fs'
import gulpUtil from 'gulp-util'
import watchify from 'watchify'
import common from './common'
import handleError from '../../lib/handleError'

export default function watch(cb) {
  const bundleEntryFilename = 'loopback-initialize.js'
  const bundleTargetFilename = 'loopback-app.bundle.js'
  const sourceDirectoryPath = "build/client/js"
  const targetDirectoryPath = "build/client"
  const bundleEntryFilePath = `${sourceDirectoryPath}/${bundleEntryFilename}`

  exists(bundleEntryFilePath, doesExist => {
    if (!doesExist) {
      gulpUtil.log('browserify:watch', `Warning: Path does not exist ${bundleEntryFilePath}`)
      cb()
    }

    const bundle = watchify(common.getBundle(targetDirectoryPath, bundleEntryFilePath))

    bundle.on('update', () => common.runBundle(bundle, bundleTargetFilename, targetDirectoryPath, () => {}))
    bundle.on('log', gulpUtil.log.bind(gulpUtil, 'browserify:watch'))

    common.runBundle(bundle, bundleTargetFilename, targetDirectoryPath, cb)
  })
}
