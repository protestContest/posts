import React from 'react';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';

export default ({currentPage}) => (
  <ToolBar type='-nav'>
    <ToolButton icon='list' label='Posts' active={currentPage === 'posts'} />
    <ToolButton icon='newspaper-o' label='Feed' href='/feed'  active={currentPage === 'feed'}/>
    <ToolButton icon='users' label='Following' href='/users/' active={currentPage === 'following'} />
    <ToolButton icon='cog' label='Settings' href='/settings' active={currentPage === 'settings'} />
  </ToolBar>
);