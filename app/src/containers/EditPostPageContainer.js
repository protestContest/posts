import { connect } from 'react-redux';
import EditPostPage from '../components/EditPostPage';
import { createPost, updatePost, setError } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const post = (ownProps.params.slug) ? state.posts.find((post) => post.slug === ownProps.params.slug)
    : undefined;

  return {
    post: post,
    isNew: post === undefined,
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
        .then(() => ownProps.history.goBack())
        .catch((error) => dispatch(setError(error)));
    },
    goBack: ownProps.history.goBack
  };
};

const EditPostPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
export default EditPostPageContainer;