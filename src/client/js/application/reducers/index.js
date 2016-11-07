import { routerReducer } from 'react-router-redux'
import * as log from 'loglevel'

import initialize from './initialize'
import quiz from './quiz'
import quizEntry from './quizEntry'
import scoreBoard from './scoreBoard'

export default {
  initialize,
  quiz: quiz,
  quizEntry: quizEntry,
  scoreBoard: scoreBoard,
  routing: routerReducer,
}
