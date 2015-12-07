'use strict';

var React = require('react');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/home-layout.less');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {

    return React.createElement(
      'div',
      { id: 'content', className: 'home-layout' },
      React.createElement(
        'h1',
        { className: 'page-title' },
        'Posts'
      ),
      React.createElement(PostList, { posts: this.props.posts }),
      React.createElement(
        'a',
        { className: 'full-button', href: '/posts/new' },
        '+ New Post'
      )
    );
  }

});