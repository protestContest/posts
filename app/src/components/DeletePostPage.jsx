import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions';
import MessageArea from './MessageArea';
import '../styles/message-layout.less';

class DeletePostPage extends React.Component {
  render() {
    return (
      <div id='content' className='message-layout'>
        <MessageArea />
        <div className='full-message'>
          <h1 className='title'>Are you sure you want to delete <em>{this.props.post.title}</em>?</h1>
        </div>
        <div className='tool-bar -bottom'>
          <div className='toolbutton -danger-inverted' onClick={() => this.props.deletePost(this.props.post._id)}>
            <i className='fa fa-2x fa-trash'></i>
            Delete
          </div>
          <div className='toolbutton' onClick={this.props.goBack}>
            <i className='fa fa-2x fa-times'></i>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

DeletePostPage.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.find((post) => post.slug === ownProps.params.slug)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deletePost: (postId) => dispatch(deletePost(postId))
      .then(() => ownProps.history.push('/posts')),
    goBack: () => ownProps.history.goBack()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePostPage);
