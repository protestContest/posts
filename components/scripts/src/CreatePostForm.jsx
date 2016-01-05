var React = require('react');
if (process.env.BROWSER) require('../../styles/createpost-form.less');

var CreatePostForm = React.createClass({
  render: function() {
    return (
      <form id={this.props.id} className="createpost-form" method="post" action="/posts">
        <textarea className="text" name="body"></textarea>
      </form>
    );
  }
});

module.exports = CreatePostForm;