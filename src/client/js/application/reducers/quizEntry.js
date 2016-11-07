import I from 'seamless-immutable'
import * as log from 'loglevel'

// TODO: Remove magic number and retrieve it from backend?
const TOTAL_TIME = 10000 // 2 * 60 * 1000 // two minutes in milliseconds

// This reducer keeps application initialization state.
const initialState = I({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  github: null,
  subject: null,
  contact: false,

  into: {
    android: null,
    angular: null,
    clojure: null,
    dotnet: null,
    ios: null,
    java: null,
    javascript: null,
    node: null,
    react: null,
    scala: null,
  },

  // The time the quiz was started
  startTime: null,

  // Wether the quiz has started.
  started: false,

  // Wether all questions have been answered
  completed: false,

  // Wether the quiz has ended.
  ended: false,

  // TODO: Obsolete?
  answers: [],

  // The current question
  currentQuestion: null,

  // A list of questions yet to be answered.
  unansweredQuestions: [],
})

export default (state = initialState, action) => {
  switch (action.type) {
    // When the quiz is fetched, set the questions to be answered in the quizentry.
    case 'Quiz:get:success':
      return state
        .merge({
          unansweredQuestions: action.payload.questions
        })

    case 'QuizEntry:set':
      return initialState.merge(action.payload)

    case 'QuizEntry:start':
      return state.merge({
        started: true
      })

    case 'QuizEntry:answerQuizEntryQuestion':
      const index = action.payload
      const {
        currentQuestion,
        answers,
      } = state

      const chosenOption = currentQuestion.options[index]

      const newAnswer = {
        questionId: currentQuestion.id,
        optionId: chosenOption.id,
      }

      // TODO: Better way?
      return state
        .set('answers', answers.asMutable().concat([newAnswer]))

    case 'QuizEntry:setNewQuizEntryQuestion':
      const unansweredQuestions = state.unansweredQuestions

      // Stop the quiz.
      if (!unansweredQuestions.length) {
        return state
          .set('completed', true)
      }

      const newQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)]

      state = state.set('unansweredQuestions', unansweredQuestions
        .filter(x => x.id !== newQuestion.id))

      state = state.set('currentQuestion', newQuestion)

      return state

    case 'QuizEntry:end':
      return state.merge({
        ended: true,
      })

    default:
      return state
  }
}
