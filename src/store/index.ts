import { createStore, applyMiddleware } from 'redux'
import rootReducer, { IState } from './reducer'

import * as actions from './actions'
import * as selectors from './selectors'

import { composeWithDevTools } from 'redux-devtools-extension'
import { ActionType } from 'typesafe-actions'
import createSagaMiddleware from '@redux-saga/core'

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(createSagaMiddleware())),
  )
  return store
}

export default configureStore()
export { actions }
export { selectors }
