import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import EmptyComponent from './components/EmptyComponent';

let store = createStore(reducers);

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={EmptyComponent} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
});