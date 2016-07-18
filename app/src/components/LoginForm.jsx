import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    return (
      <form className="vertical-form" method="post" action="/login">
        <div className="inputrow">
          <label className="label" htmlFor="ipt-username">Username</label>
          <input className="text" id="ipt-username" name="username" required />
        </div>
        <div className="inputrow">
          <label className="label" htmlFor="ipt-password">Password</label>
          <input className="text" id="ipt-password" name="password" type="password" required />
        </div>
        <div className="submitrow">
          <button className="submit" type="submit">Log in</button>
        </div>
        <div className="bonuslink">
          <a href='/join'>Sign up</a>
        </div>
      </form>
    );
  }
}
