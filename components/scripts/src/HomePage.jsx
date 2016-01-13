/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/home-layout.less');

var HomePage = module.exports = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.posts.map(function(post) {
        post.created = new Date(post.created);
      })
    };
  },

  render: function() {
    return (
      <div id='content' className='home-layout'>
        <h1 className='page-title'>Posts</h1>
        <PostList posts={this.props.posts} />
      </div>
    );
  }

});

if (typeof window !== 'undefined') {
  ReactDOM.render(<HomePage posts={data.posts} />, document.getElementById('react-root'));
}