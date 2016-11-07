import { createAction } from 'redux-actions'
import { hashHistory } from 'react-router'

import submitQuizEntryAnswers from './submitQuizEntryAnswers'

const endQuizEntry = createAction('QuizEntry:end')

export default () => {
  return async (dispatch, getState) => {
    dispatch(endQuizEntry())

    await dispatch(submitQuizEntryAnswers())

    hashHistory.push('/scoreboard')
  }
}

