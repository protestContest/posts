export const types = {
  AUTHENTICATE: 'AUTHENTICATE',
  FETCH_POSTS: 'FETCH_POSTS',
  CREATE_POST: 'CREATE_POST',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

export function authenticate(username, password) {
  return (dispatch) => {
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
      dispatch({ type: types.AUTHENTICATE, user: username, token: response.token });
    });
  };
}

export function fetchPosts() {
  return (dispatch, getState) => {
    const { apiToken, user } = getState();
    const headers = new Headers({'Authorization': `JWT ${apiToken}`});

    return fetch(`/api/users/${user}/posts`, {headers})
    .then((response) => response.json())
    .then((response) => {
      dispatch({ type: types.FETCH_POSTS, posts: response.posts });
    });
  };
}

export function createPost(post) {
  return (dispatch, getState) => {
    const { apiToken } = getState();

    fetch('/api/posts', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${apiToken}`
      }),
      body: JSON.stringify({ post })
    }).then((response) => {
      if (response.ok) {
        dispatch({ type: types.CREATE_POST, posts: post });
      } else {
        return response.json();
      }
    }).then((data) => {
      dispatch({ type: types.SET_ERROR, error: data.error.message });
    });
  };
}

export function clearError() {
  return { type: types.SET_ERROR, error: null };
}