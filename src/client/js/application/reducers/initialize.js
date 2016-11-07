import I from 'seamless-immutable'
import * as log from 'loglevel'

// This reducer keeps application initialization state.
const initialState = I({
  hasSucceeded: false,
  hasFailed: false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'initialize:start':
      return state

    case 'initialize:success':
      return state.merge({
        hasSucceeded: true,
        hasFailed: false,
      })

    case 'initialize:error':
      return state.merge({
        hasSucceeded: false,
        hasFailed: true,
      })

    default:
      return state
  }
}
