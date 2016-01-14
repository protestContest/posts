var React = require('react');
var InputTitle = require('./InputTitle');
var EditPostForm = require('./EditPostForm');
if (process.env.BROWSER) require('../../styles/createpostpage-layout.less');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      post: {
        title: '',
        body: '',
        isPrivate: true,
        created: Date.now()
      }
    };
  },

  render: function() {
    return (
      <div id='content' className='createpostpage-layout'>
        <InputTitle form='editpostform' name='title' value={this.props.post.title} placeholder='My New Post' required />
        <EditPostForm id='editpostform' post={this.props.post} />
        <div className='tool-bar'>
          <button className='toolbutton' type='submit' form='editpostform'>
            <i className='fa fa-2x fa-floppy-o'></i>
            Save
          </button>
          <a className='toolbutton' href={'/posts/' + this.props.post._id}>
            <i className='fa fa-2x fa-times'></i>
            Cancel
          </a>
        </div>
      </div>
    );
  }

});