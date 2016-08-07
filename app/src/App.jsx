import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Cache from './cache';
import initialState from './initialState';
import { clearError, setCurrentPage } from './actions';

import './styles/base.less';
import 'whatwg-fetch';

import LoginPageContainer from './containers/LoginPageContainer';
import PostListPageContainer from './containers/PostListPageContainer';
import EditPostPageContainer from './containers/EditPostPageContainer';
import ViewPostPageContainer from './containers/ViewPostPageContainer';
import DeletePostPage from './components/DeletePostPage';
import SettingsPage from './components/SettingsPage';
import NotFoundPage from './components/NotFoundPage';

const cache = new Cache();
const initialStore = cache.restore(initialState);
const store = createStore(reducers, initialStore, applyMiddleware(thunk));
store.subscribe(() => cache.persistState(store.getState()));

const firstPage = (initialStore.startCache.location && initialStore.startCache.location !== '/') 
  ? initialStore.startCache.location
  : '/posts';

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
  store.dispatch(setCurrentPage(this.state.location.pathname));
}

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <Router history={browserHistory} onUpdate={onRouteUpdate} >
        <Redirect from='/' to={firstPage} />
        <Route path='/login' component={LoginPageContainer} />
        <Route path='/posts' component={PostListPageContainer} onEnter={requireAuth} />
        <Route path='/posts/new' component={EditPostPageContainer} onEnter={requireAuth} />
        <Route path='/posts/:slug' component={ViewPostPageContainer} />
        <Route path='/posts/:slug/edit' component={EditPostPageContainer} onEnter={requireAuth} />
        <Route path='/posts/:slug/delete' component={DeletePostPage} onEnter={requireAuth} />
        <Route path='/settings' component={SettingsPage} onEnter={requireAuth} />
        <Route path='*' component={NotFoundPage} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
});