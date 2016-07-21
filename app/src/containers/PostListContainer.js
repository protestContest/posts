import { connect } from 'react-redux';
import PostList from '../components/PostList';
import { fetchPosts } from '../actions';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

const PostListContainer = connect(mapStateToProps, mapDispatchToProps)(PostList);
export default PostListContainer;