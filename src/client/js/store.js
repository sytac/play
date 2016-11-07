import * as log from 'loglevel'
import * as reduxForm from 'redux-form'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { hashHistory } from 'react-router'
import { persistState } from 'redux-devtools'
import { routerMiddleware } from 'react-router-redux'

export function configureStore(appReducers) {
  //log.debug('store.configureStore')

  const reducers = combineReducers({
    app: appReducers,
    form: reduxForm.reducer
  });

  //log.debug('store.configureStore:reducers', reducers)

  const initialState = {
    app: {},
    form: {}
  }

  //log.debug('store.configureStore:initialState', initialState)

  const middleware = compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(hashHistory),
      loggerMiddleware({
        collapsed: true
      }),
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  //log.debug('store.configureStore:middleware', middleware)

  const store = createStore(reducers, initialState, middleware)

  //log.debug('store.configureStore:store', store)

  return store;
}
