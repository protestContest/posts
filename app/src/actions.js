export const types = {
  AUTHENTICATE: 'AUTHENTICATE',
  FETCH_POSTS: 'FETCH_POSTS',
  CREATE_POST: 'CREATE_POST',
  SET_ERROR: 'SET_ERROR',
  SET_MESSAGE: 'SET_MESSAGE'
};

export function authenticate(username, password) {
  return (dispatch) => {
    dispatch({ type: types.SET_MESSAGE, message: 'Authenticating...' });

    return fetch('/login', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({ username, password })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      dispatch({ type: types.AUTHENTICATE, user: response.user, token: response.token });
      dispatch({ type: types.SET_MESSAGE, message: null });
    });
  };
}

export function fetchPosts() {
  return (dispatch, getState) => {
    const { apiToken, user } = getState();
    const headers = new Headers({'Authorization': `JWT ${apiToken}`});

    dispatch({ type: types.SET_MESSAGE, message: 'Syncing...' });

    return fetch(`/api/users/${user.username}/posts`, {headers})
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: types.SET_MESSAGE, message: null });
        dispatch({ type: types.FETCH_POSTS, posts: response.posts });
      })
      .catch(() => {
        dispatch({ type: types.SET_ERROR, error: 'Network error' });
      });
  };
}

export function createPost(post) {
  return (dispatch, getState) => {
    const { apiToken, user } = getState();

    post.owner = user._id;

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
      if (data.post) return dispatch({ type: types.CREATE_POST, posts: data.post });
    });
  };
}

export function clearError() {
  return { type: types.SET_ERROR, error: null };
}