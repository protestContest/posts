import React, { PropTypes } from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.login(username, password);

    event.preventDefault();
    return false;
  }

  render() {
    return (
      <form className="vertical-form" onSubmit={() => this.onSubmit()}>
        <div className="inputrow">
          <label className="label" htmlFor="ipt-username">Username</label>
          <input className="text" id="ipt-username" ref="username" required />
        </div>
        <div className="inputrow">
          <label className="label" htmlFor="ipt-password">Password</label>
          <input className="text" id="ipt-password" ref="password" type="password" required />
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};