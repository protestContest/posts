import { connect } from 'react-redux';
import ViewPostPage from '../components/ViewPostPage';

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.find((post) => post.slug === ownProps.params.slug)
  };
};

const ViewPostPageContainer = connect(mapStateToProps)(ViewPostPage);
export default ViewPostPageContainer;