'use strict';

var React = require('react');
if (process.env.BROWSER) require('../../styles/createpost-form.less');

var CreatePostForm = React.createClass({
  displayName: 'CreatePostForm',

  render: function render() {
    return React.createElement(
      'form',
      { id: this.props.id, className: 'createpost-form', method: 'post', action: '/posts' },
      React.createElement('textarea', { className: 'text', name: 'body', required: true })
    );
  }
});

module.exports = CreatePostForm;