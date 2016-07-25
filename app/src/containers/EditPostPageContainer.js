import { connect } from 'react-redux';
import EditPostPage from '../components/EditPostPage';
import { createPost, updatePost } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const post = (ownProps.params.slug) ? state.posts.find((post) => post.slug === ownProps.params.slug)
    : undefined;

  return {
    post: post,
    error: state.currentError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPost: (post) => {
      dispatch(createPost(post))
        .then(() => ownProps.history.goBack());
    },
    updatePost: (post) => {
      dispatch(updatePost(post))
        .then(() => ownProps.history.goBack());
    },
    goBack: ownProps.history.goBack
  };
};

const EditPostPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
export default EditPostPageContainer;