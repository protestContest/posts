

import React from 'react';
var PostList = require('./PostList');
var ScrollContent = require('./ScrollContent');
var ToolBar = require('./ToolBar');
var ToolButton = require('./ToolButton');
import '../../styles/postlist-layout.less';

var PostListPage = React.createClass({
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

export default PostListPage;