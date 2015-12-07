'use strict';

var React = require('react');
var LoginForm = require('./LoginForm');
if (process.env.BROWSER) require('../../styles/index-layout.less');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'content', className: 'index-layout' },
      React.createElement(
        'div',
        { className: 'site-title' },
        React.createElement(
          'h1',
          { className: 'header' },
          'Posts'
        )
      ),
      React.createElement(LoginForm, null)
    );
  }
});