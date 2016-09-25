import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import PostRow, { AuxRow, EndRow } from './PostRow';
import SearchBar from './SearchBar';
import '../styles/post-list.less';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterText: ''};
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();

    if (this.props.posts.length > 0) {
      this.refs.container.scrollTop = 40;
    }
  }

  handleInput(text) {
    this.setState({filterText: text.toLowerCase()});
  }

  render() {
    const filter = (post) => post.title.toLowerCase().indexOf(this.state.filterText) !== -1;
    const posts = this.props.posts.filter(filter);


    const createRow = (post) => {
      const href = '/posts/' + post.slug;
      return (<PostRow key={post._id} post={post} href={href} readOnly={this.props.readOnly} />);
    };

    // var newPostRow = this.props.readOnly ? '' : <NewPostRow /> ;
    const lastItem = (posts.length > 0) ? <EndRow /> : (
      <div className='empty'>
        <div className='title'>No posts found</div>
        Press "New Post" to create a post
      </div>
    );

    const searchRow = (posts.length > 0) ? (
      <AuxRow>
        <SearchBar onUserInput={this.handleInput} />
      </AuxRow>
    ) : '';

    return (
      <div className='post-list' ref='container'>
        {searchRow}    
        <AuxRow>
          <Link className='display' to='/posts/new'>
            <span className='title'>+ New Post</span>
          </Link>
        </AuxRow>
        {posts.map(createRow)}
        {lastItem}
      </div>
    );
  }

}

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }))
};

PostList.defaultProps = {
  posts: []
};