export const types = {
  AUTHENTICATE: 'AUTHENTICATE'
};

export function authenticate(username, password) {
  return (dispatch) => {
    let loginData = new FormData();
    loginData.append('username', username);
    loginData.append('password', password);

    fetch('/login', {
      method: 'post',
      body: loginData
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