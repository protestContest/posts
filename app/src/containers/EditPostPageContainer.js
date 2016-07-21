import { connect } from 'react-redux';
import EditPostPage from '../components/EditPostPage';
import { updatePost } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(updatePost(post))
  };
};

const EditPostPageContainer = connect(null, mapDispatchToProps)(EditPostPage);
export default EditPostPageContainer;