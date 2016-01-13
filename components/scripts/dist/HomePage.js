'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/home-layout.less');

var HomePage = module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function getInitialState() {
    return {
      posts: this.props.posts.map(function (post) {
        post.created = new Date(post.created);
      })
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      { id: 'content', className: 'home-layout' },
      React.createElement(
        'h1',
        { className: 'page-title' },
        'Posts'
      ),
      React.createElement(PostList, { posts: this.props.posts })
    );
  }

});

if (typeof window !== 'undefined') {
  ReactDOM.render(React.createElement(HomePage, { posts: data.posts }), document.getElementById('react-root'));
}