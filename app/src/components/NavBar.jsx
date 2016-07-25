import React, { PropTypes } from 'react';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';

export default class NavBar extends React.Component {
  render() {
    return (
      <ToolBar type='-bottom'>
        <ToolButton icon='list' label='Posts' active={this.props.currentPage === 'posts'} />
        <ToolButton icon='newspaper-o' label='Feed' href='/feed'  active={this.props.currentPage === 'feed'}/>
        <ToolButton icon='users' label='Following' href='/users/' active={this.props.currentPage === 'following'} />
        <ToolButton icon='cog' label='Settings' href='/settings' active={this.props.currentPage === 'settings'} />
      </ToolBar>
    );
  }
}

NavBar.propTypes = {
  currentPage: PropTypes.string
};