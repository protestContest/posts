'use strict';

var React = require('react');
if (process.env.BROWSER) require('../../styles/input-title.less');

var InputTitle = React.createClass({
  displayName: 'InputTitle',

  render: function render() {
    return React.createElement('input', { className: 'input-title', name: this.props.name, form: this.props.form, placeholder: this.props.placeholder, defaultValue: this.props.value, required: true });
  }
});

module.exports = InputTitle;