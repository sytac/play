import * as log from 'loglevel'
import { createAction } from 'redux-actions'

const start   = createAction('Quiz:get:start')
const success = createAction('Quiz:get:success')
const failure = createAction('Quiz:get:failure')

// TODO: Refactor into service
function headers(options) {
  return Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }, options)
}

async function postRequest(url, body) {
  return await fetch(url, {
    method: 'post',
    headers: headers(),
    body: JSON.stringify(body)
  })
}

async function getQuestions(quizId) {
  return await postRequest(`/api/Questions/withOptions`, {
    quizId,
  })
}

export default (subject) => {
  return async (dispatch, ...args) => {
    dispatch(start())

    const quizResponse = await fetch(`/api/Quizzes?filter[where][subject]=${subject}`)
    const [ quiz ] = await quizResponse.json()
    const quizQuestionsResponse = await getQuestions(quiz.id)
    quiz.questions = (await quizQuestionsResponse.json()).questions

    dispatch(success(quiz))
  }
}
