import * as log from 'loglevel'
import { createAction } from 'redux-actions'

const start   = createAction('Scoreboard:get:start')
const success = createAction('Scoreboard:get:success')
const failure = createAction('Scoreboard:get:failure')

export default (subject) => {
  return async (dispatch, getState) => {
    dispatch(start())

    const result = await fetch(`/api/QuizEntries/scoreboard`)
    const json = await result.json()

    dispatch(success(json))
  }
}
