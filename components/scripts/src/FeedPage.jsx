/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/postlist-layout.less');

var FeedPage = module.exports = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.posts.map(function(post) {
        post.created = new Date(post.created);
        post.updated = new Date(post.updated);
      })
    };
  },

  render: function() {
    return (
      <div id='content' className='postlist-layout'>
        <div className='page-header'>
          <div className='page-title'>
            <h1 className='title'>Feed</h1>
          </div>
        </div>
        <PostList posts={this.props.posts} readOnly='true' />
        <div className='tool-bar'>
          <a className='toolbutton' href='/feed'>
            <i className='fa fa-2x fa-list'></i>
            Posts
          </a>
          <a className='toolbutton' href='/posts/new'>
            <i className='fa fa-2x fa-users'></i>
            Following
          </a>
          <a className='toolbutton' href='/settings'>
            <i className='fa fa-2x fa-cog'></i>
            Settings
          </a>
        </div>
      </div>
    );
  }

});

if (typeof window !== 'undefined' && data.pageName === 'FeedPage') {
  ReactDOM.render(<FeedPage posts={data.posts} user={data.user} title={data.title} />, document.getElementById('react-root'));
}