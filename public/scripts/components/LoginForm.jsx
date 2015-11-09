var React = require('react');

var LoginForm = React.createClass({
  render: function() {
    return (
      <form className="login-form" method="post" action="/login">
        <div className="inputrow">
          <label className="label" for="ipt-username">Username</label>
          <input className="text" id="ipt-username" name="username" required />
        </div>
        <div className="inputrow">
          <label className="label" for="ipt-password">Password</label>
          <input className="text" id="ipt-password" name="password" type="password" required />
        </div>
        <div className="submitrow">
        <button className="submit" type="submit">Log in</button>
        </div>
      </form>
    );
  }
});

module.exports = LoginForm;