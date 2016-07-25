import { connect } from 'react-redux';
import ViewPostPage from '../components/ViewPostPage';
import { markdown } from 'markdown';

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.find((post) => post.slug === ownProps.params.slug);

  const renderedPost = (post && post.body)
    ? {
      ...post,
      body: markdown.toHTML(post.body)
    }
    : '';

  return {
    post: renderedPost,
    readOnly: state.user._id !== post.owner
  };
};

const ViewPostPageContainer = connect(mapStateToProps)(ViewPostPage);
export default ViewPostPageContainer;