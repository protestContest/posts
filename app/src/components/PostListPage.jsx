import React, { PropTypes } from 'react';
import PostListContainer from '../containers/PostListContainer';
import MessageArea from './MessageArea';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import '../styles/postlist-layout.less';
import '../styles/page-title.less';
import '../styles/page-header.less';

export default class PostListPage extends React.Component {
  render() {
    return (
      <div id='content' className='postlist-layout'>
        <MessageArea />
        <div className='page-header'>
          <div className='page-title'>
            <h1 className='title'>Posts</h1>
          </div>
          <ToolBar>
            <ToolButton icon='gear' href='/settings' label='' />
          </ToolBar>
        </div>
        <PostListContainer posts={this.props.posts} />
      </div>
    );
  }

}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired
};

PostListPage.defaultProps = {
  posts: []
};