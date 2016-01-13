'use strict';

var React = require('react');
var InputTitle = require('./InputTitle');
var CreatePostForm = require('./CreatePostForm');
if (process.env.BROWSER) require('../../styles/createpostpage-layout.less');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'content', className: 'createpostpage-layout' },
      React.createElement(InputTitle, { form: 'createpostform', name: 'title', placeholder: 'My New Post' }),
      React.createElement(CreatePostForm, { id: 'createpostform', user: this.props.user._id }),
      React.createElement(
        'button',
        { type: 'submit', form: 'createpostform', className: 'full-button' },
        'Create Post'
      )
    );
  }

});