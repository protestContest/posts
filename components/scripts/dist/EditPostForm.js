'use strict';

var React = require('react');
if (process.env.BROWSER) require('../../styles/createpost-form.less');

var EditPostForm = React.createClass({
  displayName: 'EditPostForm',

  render: function render() {
    return React.createElement(
      'form',
      { id: this.props.id, className: 'createpost-form', method: 'post', action: '/posts/' + this.props.post._id },
      React.createElement('input', { type: 'hidden', name: '_method', value: 'put' }),
      React.createElement(
        'textarea',
        { className: 'text', name: 'body', required: true },
        this.props.post.body
      )
    );
  }
});

module.exports = EditPostForm;