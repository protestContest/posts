var React = require('react');
if (process.env.BROWSER) require('../../styles/createpost-form.less');

var EditPostForm = React.createClass({
  render: function() {
    return (
      <form id={this.props.id} className="createpost-form" method="post" action={'/posts/' + this.props.post._id}>
        <input type="hidden" name="_method" value="put" />
        <textarea className="text" name="body" required>{this.props.post.body}</textarea>
      </form>
    );
  }
});

module.exports = EditPostForm;