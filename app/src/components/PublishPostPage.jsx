var React = require('react');
if (process.env.BROWSER) require('../../styles/message-layout.less');

module.exports = React.createClass({
  render: function() {
    var messageTextBefore = this.props.post.isPrivate ? 'Ready to publish ' : 'Make ';
    var messageTextAfter = this.props.post.isPrivate ? '?' :   ' private?';
    var actionIcon = this.props.post.isPrivate ? 'fa-paragraph' : 'fa-eye-slash';
    var actionText = this.props.post.isPrivate ? 'Publish' : 'Unpublish';
    var makePrivate = this.props.post.isPrivate ? 'false' : 'true';

    return (
      <div id='content' className='message-layout'>
        <div className='full-message'>
          <h1 className='title'>{messageTextBefore}<em>{this.props.post.title}</em>{messageTextAfter}</h1>
        </div>
        <div className='tool-bar'>
          <button type='submit' form='updateForm' className='toolbutton -action'>
            <i className={'fa fa-2x ' + actionIcon}></i>
            {actionText}
          </button>
          <a className='toolbutton' href={'/posts/' + this.props.post.slug}>
            <i className='fa fa-2x fa-times'></i>
            Cancel
          </a>
        </div>
        <form id='updateForm' className='_hidden' method='post' action={'/posts/' + this.props.post._id}>
          <input type='hidden' name='_method' value='put' />
          <input type='hidden' name='isPrivate' value={makePrivate} />
        </form>
      </div>
    );
  }

});