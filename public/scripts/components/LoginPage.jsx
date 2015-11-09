var React = require('react');

module.exports.LoginPage = React.createClass({
  render: function() {
    return (
      <div id="content" className="index-layout">
        <div className="site-title">
          <h1 className="header">Posts</h1>
        </div>
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
      </div>
    );
  }
});