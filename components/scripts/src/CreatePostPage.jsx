var React = require('react');
var InputTitle = require('./InputTitle');
var CreatePostForm = require('./CreatePostForm');
if (process.env.BROWSER) require('../../styles/createpostpage-layout.less');

module.exports = React.createClass({

  render: function() {
    return (
      <div id="content" className="createpostpage-layout">
        <InputTitle form="createpostform" name="title" placeholder="My New Post" />
        <CreatePostForm id="createpostform" user={this.props.user._id} />
        <button type="submit" form="createpostform" className="full-button">Create Post</button>
      </div>
    );
  }

});