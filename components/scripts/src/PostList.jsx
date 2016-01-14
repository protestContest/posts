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
      <div className='post-list'>
        {posts.map(createRow)}
        <NewPostRow />
      </div>
    );
  }

});

var PostRow = React.createClass({
  getDefaultProps: function() {
    return {
      post: {
        title: '',
        created: new Date()
      },
      href: '#'
    };
  },

  getInitialState: function() {
    return { dragging: false,
      offset: 0,
      rel: 0,
      open: false,
      buttonWidth: 0
    };
  },

  onTouchStart: function(e) {
    var pageX = e.touches[0].pageX;

    this.setState({
      dragging: true,
      offset: 0,
      rel: pageX - ReactDOM.findDOMNode(this).getBoundingClientRect().left
    });
  },

  onTouchEnd: function(e) {    
    this.setState({
      dragging: false,
      rel: 0
    });
    
    var buttons = ReactDOM.findDOMNode(this.refs.buttons);
    var buttonsWidth = buttons.offsetWidth;

    if ( (!this.state.open && this.state.offset > -(0.25*buttonsWidth)) ||
         (this.state.open && this.state.offset > -(0.75*buttonsWidth)) ) {
      this.close();
    } else {
      this.open();
    }

    if (this.state.open || Math.abs(this.state.offset) > 10) {
      e.stopPropagation();
      e.preventDefault();
    }

  },

  onTouchMove: function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!this.state.dragging) return;

    var elem = ReactDOM.findDOMNode(this);
    var buttons = ReactDOM.findDOMNode(this.refs.buttons);

    var offset = e.touches[0].pageX - this.state.rel;
    offset = Math.min(0, Math.max(-buttons.offsetWidth, offset));

    this.setState({
      offset: offset
    });

    elem.style.transform = 'translate(' + offset + 'px)';
  },

  close: function() {
    var elem = ReactDOM.findDOMNode(this);

    elem.addEventListener('transitionend', function() {
      elem.style.transition = 'none';
    });
    elem.style.transition = 'transform 0.3s';

    elem.style.transform = 'translate(0)';
    this.setState({ open: false });
  },

  open: function() {
    var elem = ReactDOM.findDOMNode(this);
    var buttons = ReactDOM.findDOMNode(this.refs.buttons);
    var buttonsWidth = buttons.offsetWidth;

    elem.addEventListener('transitionend', function() {
      elem.style.transition = 'none';
    });
    elem.style.transition = 'transform 0.3s';

    elem.style.transform = 'translate(-' + buttonsWidth + 'px)';
    this.setState({ open: true });
  },

  render: function() {
    var created = this.props.post.created.toDateString();
    return (
      <div className='postrow'>
        <a className='title' href={this.props.href} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} onTouchMove={this.onTouchMove}>
          {this.props.post.title}<br/>
          <small className='postdate'>{created}</small>
        </a>
        <div ref='buttons' className='buttons'>
          <PostButton label='Edit' icon='fa-pencil' href={this.props.href + '/edit'} />
          <PostButton label='Delete' icon='fa-trash' href={this.props.href + '/delete'} type='danger' />
        </div>
      </div>
    );
  }
});

var PostButton = React.createClass({
  render: function() {
    var classes = 'button';
    classes = classes + (this.props.type === 'danger' ? ' -danger' : '');

    return (
      <a href={this.props.href} className={classes}>
        <i className={'fa fa-2x ' + this.props.icon}></i>
        {this.props.label}
      </a>
    );
  }
});

var NewPostRow = React.createClass({
  render: function() {
    return (
      <div className='postrow -newpost'>
        <a className='title' href='/posts/new'>
          + New Post
        </a>
      </div>
    );
  }
});