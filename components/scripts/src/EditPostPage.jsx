var React = require('react');
var InputTitle = require('./InputTitle');
var EditPostForm = require('./EditPostForm');
if (process.env.BROWSER) require('../../styles/createpostpage-layout.less');

module.exports = React.createClass({

  render: function() {
    return (
      <div id="content" className="createpostpage-layout">
        <InputTitle form="editpostform" name="title" value={this.props.post.title} required />
        <EditPostForm id="editpostform" post={this.props.post} />
        <button type="submit" form="editpostform" className="full-button">Update Post</button>
      </div>
    );
  }

});