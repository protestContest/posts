import { connect } from 'react-redux';
import PostList from '../components/PostList';
import { fetchPosts } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

const PostListContainer = connect(null, mapDispatchToProps)(PostList);
export default PostListContainer;