export const types = {
  AUTHENTICATE: 'AUTHENTICATE',
  FETCH_POSTS: 'FETCH_POSTS'
};

export function authenticate(username, password) {
  return (dispatch) => {
    return fetch('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
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
    const headers = new Headers({
      'Authorization': `JWT ${apiToken}`
    });

    return fetch(`/api/users/${user}/posts`, {headers})
    .then((response) => response.json())
    .then((response) => {
      dispatch({ type: types.FETCH_POSTS, posts: response.posts });
    });
  };
}