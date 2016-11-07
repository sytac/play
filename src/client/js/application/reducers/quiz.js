import I from 'seamless-immutable'
import * as log from 'loglevel'

// This reducer keeps application initialization state.
const initialState = I({
  id: null,
  subject: null,
  entries: []
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Quiz:get:start':
      return state

    case 'Quiz:get:success':
      return state.merge(action.payload)

    // TODO: implement
    case 'Quiz:get:failure':
      return state

    default:
      return state
  }
}
