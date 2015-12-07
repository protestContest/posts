'use strict';

var React = require('react');
if (process.env.BROWSER) require('../../styles/login-form.less');

var LoginForm = React.createClass({
  displayName: 'LoginForm',

  render: function render() {
    return React.createElement(
      'form',
      { className: 'login-form', method: 'post', action: '/login' },
      React.createElement(
        'div',
        { className: 'inputrow' },
        React.createElement(
          'label',
          { className: 'label', htmlFor: 'ipt-username' },
          'Username'
        ),
        React.createElement('input', { className: 'text', id: 'ipt-username', name: 'username', required: true })
      ),
      React.createElement(
        'div',
        { className: 'inputrow' },
        React.createElement(
          'label',
          { className: 'label', htmlFor: 'ipt-password' },
          'Password'
        ),
        React.createElement('input', { className: 'text', id: 'ipt-password', name: 'password', type: 'password', required: true })
      ),
      React.createElement(
        'div',
        { className: 'submitrow' },
        React.createElement(
          'button',
          { className: 'submit', type: 'submit' },
          'Log in'
        )
      )
    );
  }
});

module.exports = LoginForm;