import { connect } from 'react-redux';
import PostListPage from '../components/PostListPage';

const mapStateToProps = (state) => {
  return {
    posts: state.posts.sort((postA, postB) => {
      return new Date(postB.updated).valueOf() - new Date(postA.updated).valueOf();
    })
  };
};

const PostListPageContainer = connect(mapStateToProps)(PostListPage);
export default PostListPageContainer;