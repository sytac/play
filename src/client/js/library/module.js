import * as log from 'loglevel'
import React from 'react'
import _ from 'lodash'
import { combineReducers } from 'redux'

export function getReducers(module) {
  const moduleReducers = Object.assign({}, module.reducers)

  _.each(module.modules, (subModule) => {
    const submoduleReducers = getReducers(subModule)

    if (submoduleReducers) {
      moduleReducers[subModule.name] = submoduleReducers
    }
  })

  if (!_.isEmpty(moduleReducers)) {
    return combineReducers(moduleReducers)
  }
}

export function getRoutes(module, store) {
  let routes = module.modules && module.modules.length && _.map(module.modules, (subModule, i) => {
    // Recursively get the submodule's routes.
    const subModuleRoutes = getRoutes(subModule, store)

    return <div key={i}>{subModuleRoutes}</div>
  }) || null

  // Get the module's routes.
  return module.routes({
    // Pass the subModule's route elements.
    routes: routes,

    // Pass the Redux store.
    store: store,
  })
}
