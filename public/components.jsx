var React = require('react');

var HelloMessage = React.createClass({
  handleClick: function() {
    alert('you clicked!');
  },

  render: function() {
    return <div onClick={this.handleClick}>Hello {this.props.name}</div>;
  }
});

exports.HelloMessage = HelloMessage;