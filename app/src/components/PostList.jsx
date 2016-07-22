import React from 'react';
import PostRow, { NewPostRow, EndRow } from './PostRow';
import '../styles/post-list.less';

export default class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const that = this;
    const posts = this.props.posts || [];

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
        <NewPostRow />
        {posts.map(createRow)}
        {lastItem}
      </div>
    );
  }

}
