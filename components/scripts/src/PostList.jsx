var React = require('react');
if (process.env.BROWSER) require('../../styles/post-list.less');

module.exports = React.createClass({

  render: function() {
    var createRow = function(post) {
      var href = '/posts/' + post._id;
      return (<PostRow post={post} href={href} />);
    };

    return (
      <div className="post-list">
        {this.props.posts.map(createRow)}
        <NewPostRow />
      </div>
    );
  }

});

var PostRow = React.createClass({
  render: function() {
    var created = this.props.post.created.toDateString();
    return (
      <a className="postrow" href={this.props.href}>
        {this.props.post.title}<br/>
        <small className="postdate">{created}</small>
      </a>
    );
  }
});

var NewPostRow = React.createClass({
  render: function() {
    return (
      <a className="postrow -newpost" href="/posts/new">
        + New Post
      </a>
    );
  }
});