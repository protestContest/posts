import { connect } from 'react-redux';
import EditPostPage from '../components/EditPostPage';
import { createPost } from '../actions';

const mapStateToProps = (state) => {
  return {
    error: state.currentError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPost: (post) => {
      dispatch(createPost(post))
        .then(() => ownProps.history.goBack());
    },
    goBack: ownProps.history.goBack
  };
};

const EditPostPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
export default EditPostPageContainer;