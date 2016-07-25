import React, { PropTypes } from 'react';
import InputTitle from './InputTitle';
import MessageAreaContainer from '../containers/MessageAreaContainer';
import '../styles/editpostpage-layout.less';
import '../styles/editpost-form.less';

export default class EditPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Note from ' + new Date().toDateString(),
      body: '' 
    };

    this.save = this.save.bind(this);
    this.extractTitle = this.extractTitle.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  save() {
    const post = {
      title: this.state.title,
      body: this.state.body
    };

    this.props.createPost(post);
  }

  extractTitle(text) {
    const re = /^#?(.+?)\n/;
    const matches = text.match(re);
    if (matches && matches.length >= 2) {
      return matches[1].trim();
    } else {
      return 'Note from ' + new Date().toDateString();
    }
  }

  updateTitle(event) {
    this.setState({ title: event.target.value });
  }

  updateBody(event) {
    this.setState({ body: event.target.value });
  }

  render() {
    return (
      <div id='content' className='editpostpage-layout'>
        <MessageAreaContainer />
        <InputTitle ref='title' onChange={this.updateTitle} value={this.state.title} />
        <div className='editpost-form'>
          <textarea className='text' name='body' 
            defaultValue={this.props.post.body}
            onChange={this.updateBody}></textarea>
        </div>
        <div className='tool-bar'>
          <button className='toolbutton -action' onClick={this.save}>
            <i className='fa fa-2x fa-floppy-o'></i>
            Save
          </button>
          <a className='toolbutton' onClick={this.props.goBack}>
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