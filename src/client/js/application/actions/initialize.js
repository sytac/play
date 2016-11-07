import { createAction } from 'redux-actions'

const initializeStart = createAction('initialize:start')
const initializeSuccess = createAction('initialize:success')

export default () => {
  return (dispatch) => {
    dispatch(initializeStart())

    // TODO: Initializy things.

    dispatch(initializeSuccess())
  }
}
