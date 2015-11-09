var React = require('react');

module.exports.LoginPage = React.createClass({
  render: function() {
    return (
      <div id="content" className="index-layout">
        <div className="site-title">
          <h1 className="header">Posts</h1>
        </div>
        <LoginForm />
      </div>
    );
  }
});