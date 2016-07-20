export const types = {
  AUTHENTICATE: 'AUTHENTICATE'
};

export function authenticate(username, password) {
  return (dispatch) => {
    fetch('/login', {
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
      dispatch({ type: types.AUTHENTICATE, token: response.token });
    })
    .catch((/*error*/) => {
      // error :(
    });
  };
}