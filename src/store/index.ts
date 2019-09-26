import { createStore } from 'redux'
import rootReducer from './reducer'

import * as actions from './actions'
import * as selectors from './selectors'

import { composeWithDevTools } from 'redux-devtools-extension'

export const configureStore = () => {
  const store = createStore(rootReducer, {}, composeWithDevTools())
  return store
}

export default configureStore()
export { actions }
export { selectors }
