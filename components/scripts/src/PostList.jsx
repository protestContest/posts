var React = require('react');
var ReactDOM = require('react-dom');
var SearchBar = require('./SearchBar');
if (process.env.BROWSER) require('../../styles/post-list.less');

module.exports = React.createClass({

  getInitialState: function() {
    return {filterText: ''};  
  },

  getDefaultProps: function() {
    return {readOnly: false};
  },

  handleInput: function(text) {
    this.setState({filterText: text.toLowerCase()});
  },

  render: function() {
    var that = this;
    var posts = this.props.posts || [];

    var filter = function(post) {
      return post.title.toLowerCase().indexOf(that.state.filterText) !== -1;
    };

    var createRow = function(post) {
      var href = '/posts/' + post.slug;
      return (<PostRow key={post._id} post={post} href={href} readOnly={that.props.readOnly} />);
    };

    var newPostRow = this.props.readOnly ? '' : <NewPostRow /> ;

    return (
      <div className='post-list'>
        <SearchBar onUserInput={this.handleInput} />
        {newPostRow}
        {posts.filter(filter).map(createRow)}
        <EndRow />
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
    if (!this.refs.buttons) return;
    var pageX = e.touches[0].pageX;

    this.setState({
      dragging: true,
      offset: 0,
      rel: pageX - ReactDOM.findDOMNode(this).getBoundingClientRect().left
    });
  },

  onTouchEnd: function(e) {    
    if (!this.refs.buttons) return;
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
    if (!this.refs.buttons) return;
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
    var updated = this.props.post.updated.toDateString();
    var icon = this.props.post.isPrivate ? 'edit' : 'globe';
    
    var toolBar = this.props.readOnly ? '' : (
      <div ref='buttons' className='tool-bar -offcanvas'>
        <a href={this.props.href + '/edit'} className='toolbutton'>
          <i className='fa fa-2x fa-pencil'></i>
          Edit
        </a>
        <a href={this.props.href + '/delete'} className='toolbutton -danger'>
          <i className='fa fa-2x fa-trash'></i>
          Delete
        </a>
      </div>
    );

    return (
      <div className='postrow'>
        <a className='title' href={this.props.href} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} onTouchMove={this.onTouchMove}>
          {this.props.post.title}
          <small className='postdate'><i className={'fa fa-' + icon}></i> {updated} </small>
        </a>
        {toolBar}
      </div>
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

var EndRow = React.createClass({
  render: function() {
    return (
      <div className='postrow -endrow'>■</div>
    );
  }
});