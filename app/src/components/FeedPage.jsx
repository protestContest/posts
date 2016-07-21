import React, { PropTypes } from 'react';
import PostList from './PostList';
import ScrollContent from './ScrollContent';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import '../styles/postlist-layout.less';

export default class FeedPage extends React.Component {
  getInitialState() {
    return {
      posts: this.props.posts.map(function(post) {
        post.created = new Date(post.created);
        post.updated = new Date(post.updated);
      })
    };
  }

  render() {
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

}

FeedPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};