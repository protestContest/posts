import React, { PropTypes } from 'react';
import SearchBar from './SearchBar';
import PostListContainer from '../containers/PostListContainer';
import NavBar from './NavBar';
import MessageArea from './MessageArea';
import '../styles/postlist-layout.less';
import '../styles/page-title.less';
import '../styles/page-header.less';

export default class PostListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterText: ''};
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(text) {
    this.setState({filterText: text.toLowerCase()});
  }

  render() {
    const filter = (post) => post.title.toLowerCase().indexOf(this.state.filterText) !== -1;

    return (
      <div id='content' className='postlist-layout'>
        <MessageArea />
        <div className='page-header'>
          <div className='page-title'>
            <h1 className='title'>Posts</h1>
          </div>
          <SearchBar onUserInput={this.handleInput} />          
        </div>
        <PostListContainer posts={this.props.posts.filter(filter)} />
        <NavBar currentPage='posts' />
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