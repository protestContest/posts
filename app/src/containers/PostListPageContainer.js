import { connect } from 'react-redux';
import PostListPage from '../components/PostListPage';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const PostListPageContainer = connect(mapStateToProps)(PostListPage);
export default PostListPageContainer;