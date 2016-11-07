import loopback from 'loopback'
import boot from 'loopback-boot'
import log from 'loglevel'

import authenticationMiddleware from './middleware/authentication'
import dummyDataMiddleware from './middleware/dummyData'

const app = loopback()

log.setLevel(process.env.LOGLEVEL || 'debug')

function handleError(error) {
  throw error
}

boot(app, __dirname, (error) => {
  if (error) return handleError(error)

  authenticationMiddleware(app, error => {
    if (error) return handleError(error)

    dummyDataMiddleware(app, error => {
      if (error) return handleError(error)

      return app.listen(() => {
        app.emit('started')

        const baseUrl = app.get('url').replace(/\/$/, '')

        console.log('Web server listening at: %s', baseUrl)

        if (app.get('loopback-component-explorer')) {
          const explorerPath = app.get('loopback-component-explorer').mountPath

          console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
        }
      })
    })
  })
})

module.exports = app
