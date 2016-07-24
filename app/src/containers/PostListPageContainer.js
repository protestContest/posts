import { connect } from 'react-redux';
import PostListPage from '../components/PostListPage';

const mapStateToProps = (state) => {
  return {
    posts: state.posts.sort((postA, postB) => postB.updated - postA.updated)
  };
};

const PostListPageContainer = connect(mapStateToProps)(PostListPage);
export default PostListPageContainer;