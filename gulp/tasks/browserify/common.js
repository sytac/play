import fs from 'fs'

//import gulp from 'gulp'
import browserify from 'browserify'
import exorcist from 'exorcist'
import gulpUtil from 'gulp-util'
import loopbackBoot from 'loopback-boot'

import handleError from '../../lib/handleError'

let bundle = null
export function getBundle(rootDir, entryFilePath) {
  if (bundle) {
    return bundle
  }

  bundle = browserify({
    entries: [entryFilePath],
    debug: true
  })

  loopbackBoot.compileToBrowserify({
    appRootDir: `${rootDir}/loopback`
  }, bundle)

  return bundle
}

export function runBundle(bundle, fileName, directoryPath, cb) {
  gulpUtil.log('browserify:compile', `Starting ${fileName}`)

  let mapFileName = fileName.replace('.js', '.map.js')

  bundle.bundle()
    .on('error', handleError.bind(null, 'browserify:compile'))
    .pipe(exorcist(`${directoryPath}/${mapFileName}`))
    .pipe(fs.createWriteStream(`${directoryPath}/${fileName}`, 'utf8'))
    .on('end', () => {
      gulpUtil.log('browserify:compile', `Finished ${fileName}`)
      cb()
    })
}
