import React, { PropTypes } from 'react';
import '../styles/message-layout.less';

export default class DeletePostPage extends React.Component {
  render() {
    return (
      <div id='content' className='message-layout'>
        <div className='full-message'>
          <h1 className='title'>Are you sure you want to delete <em>{this.props.post.title}</em>?</h1>
        </div>
        <div className='tool-bar'>
          <button type='submit' form='deleteForm' className='toolbutton -danger-inverted'>
            <i className='fa fa-2x fa-trash'></i>
            Delete
          </button>
          <a className='toolbutton' href={'/posts/' + this.props.post.slug}>
            <i className='fa fa-2x fa-times'></i>
            Cancel
          </a>
        </div>
        <form id='deleteForm' className='_hidden' method='post' action={'/posts/' + this.props.post._id}>
          <input type='hidden' name='_method' value='delete' />
        </form>
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