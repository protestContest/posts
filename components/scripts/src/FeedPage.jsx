/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
var ScrollContent = require('./ScrollContent');
var ToolBar = require('./ToolBar');
var ToolButton = require('./ToolButton');
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
        <ScrollContent>
          <PostList posts={this.props.posts} readOnly='true' />
        </ScrollContent>
        <ToolBar>
          <ToolButton icon='list' label='Posts' href='/posts' />
          <ToolButton icon='newspaper-o' label='Feed' active={true} />
          <ToolButton icon='users' label='Following' href={'/users/' + this.props.user.username + '/subscriptions'} />
          <ToolButton icon='cog' label='Settings' href='/settings' />
        </ToolBar>
      </div>
    );
  }

});

if (typeof window !== 'undefined' && data.pageName === 'FeedPage') {
  ReactDOM.render(<FeedPage posts={data.posts} user={data.user} title={data.title} />, document.getElementById('react-root'));
}