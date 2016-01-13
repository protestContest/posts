'use strict';

var React = require('react');
var InputTitle = require('./InputTitle');
var EditPostForm = require('./EditPostForm');
if (process.env.BROWSER) require('../../styles/createpostpage-layout.less');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'content', className: 'createpostpage-layout' },
      React.createElement(InputTitle, { form: 'editpostform', name: 'title', value: this.props.post.title, required: true }),
      React.createElement(EditPostForm, { id: 'editpostform', post: this.props.post }),
      React.createElement(
        'button',
        { type: 'submit', form: 'editpostform', className: 'full-button' },
        'Update Post'
      )
    );
  }

});