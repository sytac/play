import I from 'seamless-immutable'
import * as log from 'loglevel'

const initialState = I({
  fetching: false,
  fetched: false,
  scores: [],
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Scoreboard:get:start':
      return state
        .merge({
          fetching: true,
          fetched: false,
        })

    case 'Scoreboard:get:success':
      return state
        .merge({
          fetching: false,
          fetched: true,
          scores: action.payload.scores,
        })

    default:
      return state
  }
}
