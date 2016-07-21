import React from 'react';
import { Link } from 'react-router';
import PostRow from './PostRow';
import SearchBar from './SearchBar';
import '../styles/post-list.less';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterText: ''};
    this.handleInput = this.handleInput.bind(this);

    if (!props.posts) {
      props.fetchPosts();
    }
  }

  handleInput(text) {
    this.setState({filterText: text.toLowerCase()});
  }

  render() {
    const that = this;
    const posts = this.props.posts || [];

    const filter = function(post) {
      return post.title.toLowerCase().indexOf(that.state.filterText) !== -1;
    };

    const createRow = function(post) {
      const href = '/posts/' + post.slug;
      return (<PostRow key={post._id} post={post} href={href} readOnly={that.props.readOnly} />);
    };

    // var newPostRow = this.props.readOnly ? '' : <NewPostRow /> ;
    const lastItem = (posts.length > 0) ? <EndRow /> : (
      <div className='empty'>
        <div className='title'>You have no posts!</div>
        Press "New Post" to create a post
      </div>
    );

    return (
      <div className='post-list'>
        <SearchBar onUserInput={this.handleInput} />
        <NewPostRow />
        {posts.filter(filter).map(createRow)}
        {lastItem}
      </div>
    );
  }

}

class NewPostRow extends React.Component {
  render() {
    return (
      <div className='postrow -newpost'>
        <Link className='title' to='/posts/new'>
          + New Post
        </Link>
      </div>
    );
  }
}

class EndRow extends React.Component{
  render() {
    return (
      <div className='postrow -endrow'>■</div>
    );
  }
}