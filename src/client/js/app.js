import 'whatwg-fetch'
import '../styles.css';
import * as log from 'loglevel'
import React from 'react'
import domready from 'domready'
import reactElementToJSXString from 'react-element-to-jsx-string'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'

import application from './application'
import initializeAction from './application/actions/initialize'
import { configureStore } from './store'
import { getReducers, getRoutes } from './library/module'

import ReactGA from 'react-ga'

log.setLevel('debug')

const reducers = window.reducers = getReducers(application)
const store    = window.store    = configureStore(reducers)
const routes   = window.routes   = getRoutes(application, store)

log.debug('routes', reactElementToJSXString(routes))

function reportAnalytics() {
  ReactGA.pageview(window.location.hash)
}

function start() {
  ReactGA.initialize('UA-86543682-1')

  const rootElement = document.getElementById('root')

  const allRoutes = <Router onUpdate={reportAnalytics} history={hashHistory}>
    {routes}
  </Router>

  render(<Provider store={store} children={allRoutes}/>, rootElement)

  //if (module.hot) {
  //  module.hot.accept('./application/routes', () => {
  //    render(routes, rootElement)
  //  })
  //}
}

// Set this initialize flow up so that things may happen asynchronously while
// loading the page, like getting cookie information, fetching a user profile
// from the server based on it, etc.
store.subscribe(() => {
  const state = store.getState()

  if (state.app.initialize.hasSucceeded) {
    // On DOM ready, render.
    domready(start)
  }
});

store.dispatch(initializeAction())
