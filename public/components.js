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

exports.HelloMessage = HelloMessage;

