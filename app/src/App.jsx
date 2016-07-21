import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Cache from './cache';

import './styles/base.less';
import LoginPage from './components/LoginPage';
import PostListPage from './components/PostListPage';
import EditPostPageContainer from './containers/EditPostPageContainer';

const cache = new Cache();
const store = createStore(reducers, cache.restore(), applyMiddleware(thunk));
store.subscribe(() => cache.persistState(store.getState()));

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
        <Route path='/posts/new' component={EditPostPageContainer} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
});