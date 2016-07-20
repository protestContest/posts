import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import './styles/base.less';
import LoginPage from './components/LoginPage';

let store = createStore(reducers, applyMiddleware(thunk));

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={LoginPage} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
});