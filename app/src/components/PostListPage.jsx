import React from 'react';
import PostListContainer from '../containers/PostListContainer';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import '../styles/postlist-layout.less';

export default class PostListPage extends React.Component {
  render() {
    return (
      <div id='content' className='postlist-layout'>
        <div className='page-header'>
          <div className='page-title'>
            <h1 className='title'>Posts</h1>
          </div>
        </div>
        <PostListContainer />
        <ToolBar>
          <ToolButton icon='list' label='Posts' active={true} />
          <ToolButton icon='newspaper-o' label='Feed' href='/feed' />
          <ToolButton icon='users' label='Following' href='/users/' />
          <ToolButton icon='cog' label='Settings' href='/settings' />
        </ToolBar>
      </div>
    );
  }

}