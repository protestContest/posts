import React from 'react';

module.exports = React.createClass({
  render: function() {
    return (
      <form className="vertical-form" method="post" action="/users">
        <div className="inputrow">
          <label className="label" htmlFor="ipt-username">Username</label>
          <input className="text" id="ipt-username" name="username" required />
        </div>
        <div className="inputrow">
          <label className="label" htmlFor="ipt-password">Password</label>
          <input className="text" id="ipt-password" name="password" type="password" required />
        </div>
        <div className="submitrow">
          <button className="submit" type="submit">Create account</button>
        </div>
        <div className="bonuslink">
          <a href='/login'>Already have an account?</a>
        </div>
      </form>
    );
  }
});