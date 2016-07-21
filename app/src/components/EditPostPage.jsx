import React, { PropTypes } from 'react';
import '../styles/editpostpage-layout.less';
import '../styles/editpost-form.less';

export default class EditPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.goBack = this.goBack.bind(this);
    this.extractTitle = this.extractTitle.bind(this);
  }

  save() {
    const body = this.refs.post.value;

    const post = {
      tite: this.extractTitle(body),
      body: body
    };

    this.props.updatePost(post);
  }

  goBack() {

  }

  extractTitle(text) {
    const re = /^#? *(.+?)\n/;
    const matches = text.match(re);
    if (matches && matches.length >= 2) {
      return matches[1].trim();
    } else {
      return 'Note from ' + Date.now();
    }
  }

  render() {
    return (
      <div id='content' className='editpostpage-layout'>
        <div className='editpost-form'>
          <textarea ref='post' className='text' name='body' required>{this.props.post.body}</textarea>
        </div>
        <div className='tool-bar'>
          <button className='toolbutton -action' onClick={this.save}>
            <i className='fa fa-2x fa-floppy-o'></i>
            Save
          </button>
          <a className='toolbutton' onClick={this.goBack}>
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