import React, { PropTypes } from 'react';
import EditPostForm from './EditPostForm';
import '../styles/editpostpage-layout.less';

export default class EditPostPage extends React.Component {
  render() {
    return (
      <div id='content' className='editpostpage-layout'>
        <EditPostForm post={this.props.post} />
        <div className='tool-bar'>
          <button className='toolbutton -action'>
            <i className='fa fa-2x fa-floppy-o'></i>
            Save
          </button>
          <a className='toolbutton' href={'/posts/' + this.props.post.slug}>
            <i className='fa fa-2x fa-times'></i>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

EditPostPage.defaultProps = {
  post: {
    slug: '',
    title: '',
    body: '',
    isPrivate: true,
    created: Date.now()
  }
};

EditPostPage.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};