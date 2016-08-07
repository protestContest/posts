export const types = {
  AUTHENTICATE_START: 'AUTHENTICATE_START',
  AUTHENTICATE_PASS: 'AUTHENTICATE_PASS',
  AUTHENTICATE_FAIL: 'AUTHENTICATE_FAIL',
  FETCH_POSTS_START: 'FETCH_POSTS_START',
  FETCH_POSTS_END: 'FETCH_POSTS_END',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  SET_ERROR: 'SET_ERROR',
  SET_MESSAGE: 'SET_MESSAGE',
  LOGOUT: 'LOGOUT',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE'
};

export function authenticate(username, password) {
  return (dispatch) => {
    dispatch({ type: types.AUTHENTICATE_START });

    return fetch('/login', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({ username, password })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Promise((resolve, reject) => {
          dispatch({ type: types.SET_ERROR, error: 'Could not log in' });
          dispatch({ type: types.AUTHENTICATE_FAIL });
          reject({
            status: response.status,
            statusText: response.statusText
          });
        });
      }
    })
    .then((response) => {
      if (response) dispatch({ type: types.AUTHENTICATE_PASS, user: response.user, token: response.token });
    });
  };
}

export function fetchPosts() {
  return (dispatch, getState) => {
    const { apiToken, user } = getState();
    const headers = new Headers({'Authorization': `JWT ${apiToken}`});

    dispatch({ type: types.FETCH_POSTS_START });

    return fetch(`/api/users/${user.username}/posts`, {headers})
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: types.FETCH_POSTS_END, posts: response.posts });
      })
      .catch(() => dispatch({ type: types.SET_ERROR, error: 'Network error' }));
  };
}

export function createPost(post) {
  return (dispatch, getState) => {
    if (!post.title || post.title.length === 0) {
      return dispatch({ type: types.SET_ERROR, error: 'Title is required' });
    }

    dispatch({ type: types.SET_MESSAGE, message: 'Saving...' });

    const { apiToken } = getState();

    return fetch('/api/posts', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${apiToken}`
      }),
      body: JSON.stringify({ post })
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: types.SET_MESSAGE, message: null });
      if (data.error) return dispatch({ type: types.SET_ERROR, error: data.error.message });
      if (data.post) return dispatch({ type: types.CREATE_POST, post: data.post });
    })
    .catch(() => dispatch({ type: types.SET_ERROR, error: 'Network error' }));
  };
}

export function updatePost(post) {
  return (dispatch, getState) => {
    if (!post.title || post.title.length === 0) {
      return dispatch({ type: types.SET_ERROR, error: 'Title is required' });
    }

    dispatch({ type: types.SET_MESSAGE, message: 'Saving...' });

    const { apiToken } = getState();

    return fetch(`/api/posts/${post.slug}`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${apiToken}`
      }),
      body: JSON.stringify({ post })
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: types.SET_MESSAGE, message: null });

      if (data.error) {
        return Promise.reject(data.error.message);
      }

      if (data.post) return dispatch({ type: types.UPDATE_POST, post: data.post });
    })
    .catch(() => dispatch({ type: types.SET_ERROR, error: 'Network error' }));
  };
}

export function deletePost(id) {
  return (dispatch, getState) => {
    dispatch({ type: types.SET_MESSAGE, message: 'Deleting...' });
    
    const { apiToken } = getState();

    return fetch(`/api/posts/${id}`, {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${apiToken}`
      })
    })
    .catch(() => {
      dispatch({ type: types.SET_MESSAGE, message: null });
      dispatch({ type: types.SET_ERROR, error: 'Network error' });
      return Promise.reject('Network error');
    })
    .then((response) => {
      dispatch({ type: types.SET_MESSAGE, message: null });

      if (response.ok) {
        return dispatch({ type: types.DELETE_POST, id: id });
      } else {
        const error = (response.statusText && response.statusText.length > 0)
          ? response.statusText : 'Could not delete post';
          
        return Promise.reject(error);
      }
    });
  };
}

export function setMessage(message) {
  return { type: types.SET_MESSAGE, message };
}

export function clearMessage() {
  return { type: types.SET_MESSAGE, message: null };
}

export function setError(error) {
  return { type: types.SET_ERROR, error };
}

export function clearError() {
  return { type: types.SET_ERROR, error: null };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: types.LOGOUT });
    return Promise.resolve();
  };
}

export function changePassword(password) {
  return (dispatch, getState) => {
    const { user, apiToken } = getState();
    dispatch(clearError());
    dispatch(setMessage('Resetting password'));

    fetch(`/api/users/${user.username}/password`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${apiToken}`
      }),
      body: JSON.stringify({ password })
    })
    .then((response) => {
      dispatch(clearMessage());
      if (!response.ok) {
        dispatch(setError('Could not reset password'));
      }
    });
  };
}

export function setCurrentPage(location) {
  return { type: types.SET_CURRENT_PAGE, location };
}