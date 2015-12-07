var React = require('react');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/home-layout.less');

module.exports = React.createClass({

  render: function() {

    return (
      <div id="content" className="home-layout">
        <h1 className="page-title">Posts</h1>
        <PostList posts={this.props.posts} />
        <a className="full-button" href="/posts/new">+ New Post</a>
      </div>
    );
  }

});