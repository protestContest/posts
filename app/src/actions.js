export const types = {
  AUTHENTICATE: 'AUTHENTICATE',
  FETCH_POSTS: 'FETCH_POSTS',
  CREATE_POST: 'CREATE_POST',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SYNC_STATUS: 'SYNC_STATUS'
};

export function authenticate(username, password) {
  return (dispatch) => {
    dispatch({ type: types.SYNC_STATUS, message: 'Authenticating...' });

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
    });
  };
}

export function fetchPosts() {
  return (dispatch, getState) => {
    const { apiToken, user } = getState();
    const headers = new Headers({'Authorization': `JWT ${apiToken}`});

    return fetch(`/api/users/${user.username}/posts`, {headers})
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: types.SYNC_STATUS, message: null });
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