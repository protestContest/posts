import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Cache from './cache';
import initialState from './initialState';
import { clearError } from './actions';

import './styles/base.less';
import 'whatwg-fetch';

import LoginPageContainer from './containers/LoginPageContainer';
import PostListPageContainer from './containers/PostListPageContainer';
import EditPostPageContainer from './containers/EditPostPageContainer';
import ViewPostPageContainer from './containers/ViewPostPageContainer';
import DeletePostPage from './components/DeletePostPage';
import NotFoundPage from './components/NotFoundPage';

const cache = new Cache();
const store = createStore(reducers, cache.restore(initialState), applyMiddleware(thunk));
store.subscribe(() => cache.persistState(store.getState()));

function requireAuth(nextState, replace) {
  const state = store.getState();
  if (!state || !state.user) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function onRouteUpdate() {
  store.dispatch(clearError());
}

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <Router history={browserHistory} onUpdate={onRouteUpdate}>
        <Redirect from='/' to='/posts' />
        <Route path='/login' component={LoginPageContainer} />
        <Route path='/posts' component={PostListPageContainer} onEnter={requireAuth} />
        <Route path='/posts/new' component={EditPostPageContainer} />
        <Route path='/posts/:slug' component={ViewPostPageContainer} />
        <Route path='/posts/:slug/edit' component={EditPostPageContainer} />
        <Route path='/posts/:slug/delete' component={DeletePostPage} />
        <Route path='*' component={NotFoundPage} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
});