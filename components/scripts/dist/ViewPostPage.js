'use strict';

var React = require('react');
if (process.env.BROWSER) require('../../styles/viewpost-layout.less');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    var publishIcon = this.props.post.isPrivate ? "paragraph" : "eye-slash";
    var publishLabel = this.props.post.isPrivate ? "Publish" : "Unpublish";
    var privateIcon = this.props.post.isPrivate ? "lock" : "unlock";
    var privateLabel = this.props.post.isPrivate ? "Private" : "Public";

    return React.createElement(
      'div',
      { id: 'content', className: 'viewpost-layout' },
      React.createElement(
        'h1',
        { className: 'page-title' },
        this.props.post.title
      ),
      React.createElement('div', { className: 'post-text', dangerouslySetInnerHTML: { __html: this.props.post.body } }),
      React.createElement(
        'div',
        { className: 'tool-bar' },
        React.createElement(
          'a',
          { className: 'toolbutton', href: '/home' },
          React.createElement('i', { className: 'fa fa-2x fa-list' }),
          React.createElement('br', null),
          'Posts'
        ),
        React.createElement(
          'a',
          { className: 'toolbutton', href: this.props.post._id + "/edit" },
          React.createElement('i', { className: 'fa fa-2x fa-pencil' }),
          React.createElement('br', null),
          'Edit'
        ),
        React.createElement(
          'a',
          { className: 'toolbutton', href: this.props.post._id + "/publish" },
          React.createElement('i', { className: "fa fa-2x fa-" + publishIcon }),
          React.createElement('br', null),
          publishLabel
        ),
        React.createElement(
          'a',
          { className: 'toolbutton -danger', href: this.props.post._id + "/delete" },
          React.createElement('i', { className: 'fa fa-2x fa-trash' }),
          React.createElement('br', null),
          'Delete'
        )
      )
    );
  }

});