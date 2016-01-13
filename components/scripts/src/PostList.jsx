var React = require('react');
var ReactDOM = require('react-dom');
if (process.env.BROWSER) require('../../styles/post-list.less');

module.exports = React.createClass({

  render: function() {
    var posts = this.props.posts || [];

    var createRow = function(post) {
      var href = '/posts/' + post._id;
      return (<PostRow post={post} href={href} />);
    };

    return (
      <div className="post-list">
        {posts.map(createRow)}
        <NewPostRow />
      </div>
    );
  }

});

var PostRow = React.createClass({
  getInitialState: function() {
    return { dragging: false, offset: 0, rel: 0, open: false };
  },

  onTouchStart: function(e) {
    e.stopPropagation();
    e.preventDefault();

    var pageX = e.touches[0].pageX;

    this.setState({
      dragging: true,
      offset: 0,
      rel: pageX - ReactDOM.findDOMNode(this).getBoundingClientRect().left
    });
  },

  onTouchEnd: function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    this.setState({
      dragging: false,
      rel: 0
    });
    
    var elem = ReactDOM.findDOMNode(this);

    elem.addEventListener('transitionend', function() {
      elem.style.transition = "none";
    });
    elem.style.transition = "transform 0.5s";

    if ( (!this.state.open && this.state.offset > -25) ||
         (this.state.open && this.state.offset > -75) ) {
      elem.style.transform = "translate(0)";
      this.setState({ open: false });
    } else {
      elem.style.transform = "translate(-100px)";
      this.setState({ open: true });
    }
  },

  onTouchMove: function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!this.state.dragging) return;

    var offset = e.touches[0].pageX - this.state.rel;
    offset = Math.min(0, Math.max(-100, offset));

    this.setState({
      offset: offset
    });

    var elem = ReactDOM.findDOMNode(this);
    elem.style.transform = "translate(" + offset + "px)";
  },

  onClick: function(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  render: function() {
    var created = this.props.post.created.toDateString();
    return (
      <a onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} onTouchMove={this.onTouchMove} onClick={this.onClick} className="postrow" href={this.props.href}>
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