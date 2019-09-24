import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { Provider } from 'react-redux'

import store, { actions } from './store'

store.dispatch(
  actions.initialize({
    width: 10,
    height: 10,
    numberOfMines: 10,
  }),
)
setInterval(() => store.dispatch(actions.incrementTimer()), 1000)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
