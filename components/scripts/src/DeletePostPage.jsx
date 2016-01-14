var React = require('react');
if (process.env.BROWSER) require('../../styles/message-layout.less');

module.exports = React.createClass({
  render: function() {
    return (
      <div id='content' className='delete-layout'>
        <div className='full-message'>
          <h1 className='title'>Are you sure you want to delete <em>{this.props.post.title}</em>?</h1>
        </div>
        <div className='tool-bar'>
          <button type='submit' form='deleteForm' className='toolbutton -danger-inverted' href='/home'>
            <i className='fa fa-2x fa-trash'></i>
            Delete
          </button>
          <a className='toolbutton' href={'/posts/' + this.props.post._id}>
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

});