import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import './styles/base.less';
import LoginPage from './components/LoginPage';
import PostListPage from './components/PostListPage';
import EditPostPage from './components/EditPostPage';

const store = createStore(reducers, {}, applyMiddleware(thunk));

function requireAuth(nextState, replace) {
  const state = store.getState();
  if (!state || !state.user) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={LoginPage} />
        <Route path='/posts' component={PostListPage} onEnter={requireAuth} />
        <Route path='/posts/new' component={EditPostPage} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
});