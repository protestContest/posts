import React, { PropTypes } from 'react';
import '../styles/editpost-form.less';

export default class EditPostForm extends React.Component {
  render() {
    var isNewPost = typeof this.props.post._id === 'undefined';

    var action = isNewPost ? '/posts/' : '/posts/' + this.props.post._id;
    var method = isNewPost ? 'post' : 'put';

    return (
      <form id={this.props._id} className='editpost-form' method='post' action={action}>
        <input type='hidden' name='_method' value={method} />
        <textarea className='text' name='body' required>{this.props.post.body}</textarea>
      </form>
    );
  }
}

EditPostForm.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired
};