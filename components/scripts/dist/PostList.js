'use strict';

var React = require('react');
if (process.env.BROWSER) require('../../styles/post-list.less');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    var createRow = function createRow(post) {
      var href = '/posts/' + post._id;
      return React.createElement(PostRow, { post: post, href: href });
    };

    return React.createElement(
      'div',
      { className: 'post-list' },
      this.props.posts.map(createRow)
    );
  }

});

var PostRow = React.createClass({
  displayName: 'PostRow',

  render: function render() {
    var created = this.props.post.created.toDateString();
    return React.createElement(
      'a',
      { className: 'postrow', href: this.props.href },
      this.props.post.title,
      React.createElement('br', null),
      React.createElement(
        'small',
        { className: 'postdate' },
        created
      )
    );
  }
});