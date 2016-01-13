var React = require('react');
if (process.env.BROWSER) require('../../styles/createpost-form.less');

var EditPostForm = React.createClass({
  render: function() {
    var isNewPost = typeof this.props.post._id === 'undefined';

    var action = isNewPost ? '/posts/' : '/posts/' + this.props.post._id;
    var method = isNewPost ? 'post' : 'put';

    return (
      <form id={this.props.id} className='createpost-form' method='post' action={action}>
        <input type='hidden' name='_method' value={method} />
        <textarea className='text' name='body' required>{this.props.post.body}</textarea>
      </form>
    );
  }
});

module.exports = EditPostForm;