export const types = {
  AUTHENTICATE_START: 'AUTHENTICATE_START',
  AUTHENTICATE_PASS: 'AUTHENTICATE_PASS',
  AUTHENTICATE_FAIL: 'AUTHENTICATE_FAIL',
  FETCH_POSTS_START: 'FETCH_POSTS_START',
  FETCH_POSTS_END: 'FETCH_POSTS_END',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  SET_ERROR: 'SET_ERROR',
  SET_MESSAGE: 'SET_MESSAGE'
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
      .catch(() => {
        dispatch({ type: types.SET_ERROR, error: 'Network error' });
      });
  };
}

export function createPost(post) {
  return (dispatch, getState) => {
    if (!post.title || post.title.length === 0) {
      return dispatch({ type: types.SET_ERROR, error: 'Title is required' });
    }

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
      if (data.error) return dispatch({ type: types.SET_ERROR, error: data.error.message });
      if (data.post) return dispatch({ type: types.CREATE_POST, post: data.post });
    });
  };
}

export function updatePost(post) {
  return (dispatch, getState) => {
    if (!post.title || post.title.length === 0) {
      return dispatch({ type: types.SET_ERROR, error: 'Title is required' });
    }

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
      if (data.error) return dispatch({ type: types.SET_ERROR, error: data.error.message });
      if (data.post) return dispatch({ type: types.UPDATE_POST, post: data.post });
    });

  };
}

export function clearError() {
  return { type: types.SET_ERROR, error: null };
}