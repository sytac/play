import fs from 'fs'
import path from 'path'

import _ from 'lodash'
import boot from 'loopback-boot'
import json2csv from 'json2csv'
import loopback from 'loopback'

const app = loopback()

const filePath = path.resolve(`${__dirname}/../quiz-entries.csv`)

function handleError(error) {
  throw error
}

boot(app, path.resolve(__dirname, '..', 'server'), (error) => {
  if (error) return handleError(error)

  const { QuizEntry } = app.models

  QuizEntry
    .find({})
    .then(results => {
      try {
        const csv = json2csv({
          data: results.map(entry => {
              const copy = JSON.parse(JSON.stringify(entry))
              copy.interests = Object.keys(entry.into).filter(subj => entry.into[subj]).join(', ')
              return copy
            }),
          fields: [ 'firstName', 'lastName', 'email', 'github', 'interests', 'subject', 'score', 'startTime', 'endTime' ],
        })


        fs.writeFile(filePath, csv, error => {
          if (error) return handleError(error)

          console.log(filePath)

          process.exit()
        })

      } catch(error) {
        return handleError(error)
      }
    })
    .catch(handleError)
})

module.exports = app
