/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/postlist-layout.less');

var PostListPage = module.exports = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.posts.map(function(post) {
        post.created = new Date(post.created);
      })
    };
  },

  componentDidMount: function() {
    // console.log('Viewing home page');
  },

  render: function() {
    if (!this.props.loggedIn) {
      var owners = this.props.user.username + '\'s ';
    }

    return (
      <div id='content' className='postlist-layout'>
        <div className='page-header'>
          <div className='page-title'>
            <h1 className='title'>{owners}Posts</h1>
          </div>
        </div>
        <PostList posts={this.props.posts} />
        <div className='tool-bar'>
          <a className='toolbutton' href='/feed'>
            <i className='fa fa-2x fa-newspaper-o'></i>
            Feed
          </a>
          <a className='toolbutton' href='/posts/new'>
            <i className='fa fa-2x fa-plus-square'></i>
            New Post
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

if (typeof window !== 'undefined' && data.pageName === 'PostListPage') {
  ReactDOM.render(<PostListPage posts={data.posts} user={data.user} loggedIn={data.loggedIn} />, document.getElementById('react-root'));
}