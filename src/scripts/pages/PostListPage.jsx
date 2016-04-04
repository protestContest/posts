/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('../PostList');
var ScrollContent = require('../ScrollContent');
var ToolBar = require('../ToolBar');
var ToolButton = require('../ToolButton');
if (process.env.BROWSER) require('../../styles/postlist-layout.less');

var PostListPage = module.exports = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.posts.map(function(post) {
        post.created = new Date(post.created);
        post.updated = new Date(post.updated);
      })
    };
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
        <ScrollContent>
          <PostList posts={this.props.posts} />
        </ScrollContent>
        <ToolBar>
          <ToolButton icon='list' label='Posts' active={true} />
          <ToolButton icon='newspaper-o' label='Feed' href='/feed' />
          <ToolButton icon='users' label='Following' href={'/users/' + this.props.user.username + '/subscriptions'} />
          <ToolButton icon='cog' label='Settings' href='/settings' />
        </ToolBar>
      </div>
    );
  }

});

if (typeof window !== 'undefined' && data.pageName === 'PostListPage') {
  ReactDOM.render(<PostListPage posts={data.posts} user={data.user} loggedIn={data.loggedIn} title={data.title} />, document.getElementById('react-root'));
}