'use strict';

var React = require('react');

var HelloMessage = React.createClass({
  displayName: 'HelloMessage',

  handleClick: function handleClick() {
    alert('you clicked!');
  },

  render: function render() {
    return React.createElement(
      'div',
      { onClick: this.handleClick },
      'Hello ',
      this.props.name
    );
  }
});

module.exports = {

  LoginPage: React.createClass({
    displayName: 'LoginPage',

    render: function render() {
      var style = {
        content: {
          'width': '100%',
          'height': '100%',
          'display': "flex",
          'flex-direction': "column",
          'align-items': "center"
        },
        title: {
          'flex': 1,
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center'
        },
        form: {
          'flex': 1
        }
      };

      return React.createElement(
        'div',
        { id: 'content', style: style.content },
        React.createElement(
          'div',
          { style: style.title },
          React.createElement(
            'h1',
            null,
            'Log in'
          )
        ),
        React.createElement(
          'div',
          { style: style.form },
          React.createElement(
            'form',
            { method: 'post' },
            React.createElement(
              'div',
              { 'class': 'form-row' },
              React.createElement(
                'label',
                null,
                'Username',
                React.createElement('input', { type: 'text', name: 'username' })
              )
            ),
            React.createElement(
              'div',
              { 'class': 'form-row' },
              React.createElement(
                'label',
                null,
                'Password',
                React.createElement('input', { type: 'password', name: 'password' })
              )
            )
          )
        )
      );
    }
  })

};

