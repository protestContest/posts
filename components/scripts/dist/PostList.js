'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
if (process.env.BROWSER) require('../../styles/post-list.less');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    var posts = this.props.posts || [];

    var createRow = function createRow(post) {
      var href = '/posts/' + post._id;
      return React.createElement(PostRow, { post: post, href: href });
    };

    return React.createElement(
      'div',
      { className: 'post-list' },
      posts.map(createRow),
      React.createElement(NewPostRow, null)
    );
  }

});

var PostRow = React.createClass({
  displayName: 'PostRow',

  getDefaultProps: function getDefaultProps() {
    return {
      post: {
        title: "", created: new Date()
      },
      href: "#"
    };
  },

  getInitialState: function getInitialState() {
    return { dragging: false,
      offset: 0,
      rel: 0,
      open: false,
      buttonWidth: 0
    };
  },

  onTouchStart: function onTouchStart(e) {
    var pageX = e.touches[0].pageX;

    this.setState({
      dragging: true,
      offset: 0,
      rel: pageX - ReactDOM.findDOMNode(this).getBoundingClientRect().left
    });
  },

  onTouchEnd: function onTouchEnd(e) {
    this.setState({
      dragging: false,
      rel: 0
    });

    var elem = ReactDOM.findDOMNode(this);
    var buttons = ReactDOM.findDOMNode(this.refs.buttons);
    var buttonsWidth = buttons.offsetWidth;

    if (!this.state.open && this.state.offset > -(0.25 * buttonsWidth) || this.state.open && this.state.offset > -(0.75 * buttonsWidth)) {
      this.close();
    } else {
      this.open();
    }

    if (this.state.open || Math.abs(this.state.offset) > 10) {
      e.stopPropagation();
      e.preventDefault();
    }
  },

  onTouchMove: function onTouchMove(e) {
    if (!this.state.dragging) return;

    var elem = ReactDOM.findDOMNode(this);
    var buttons = ReactDOM.findDOMNode(this.refs.buttons);

    var offset = e.touches[0].pageX - this.state.rel;
    offset = Math.min(0, Math.max(-buttons.offsetWidth, offset));

    this.setState({
      offset: offset
    });

    elem.style.transform = "translate(" + offset + "px)";
  },

  onClick: function onClick(e) {},

  close: function close() {
    var elem = ReactDOM.findDOMNode(this);

    elem.addEventListener('transitionend', function () {
      elem.style.transition = "none";
    });
    elem.style.transition = "transform 0.5s";

    elem.style.transform = "translate(0)";
    this.setState({ open: false });
  },

  open: function open() {
    var elem = ReactDOM.findDOMNode(this);
    var buttons = ReactDOM.findDOMNode(this.refs.buttons);
    var buttonsWidth = buttons.offsetWidth;

    elem.addEventListener('transitionend', function () {
      elem.style.transition = "none";
    });
    elem.style.transition = "transform 0.5s";

    elem.style.transform = "translate(-" + buttonsWidth + "px)";
    this.setState({ open: true });
  },

  render: function render() {
    var created = this.props.post.created.toDateString();
    return React.createElement(
      'div',
      { className: 'postrow' },
      React.createElement(
        'a',
        { className: 'title', href: this.props.href, onTouchStart: this.onTouchStart, onTouchEnd: this.onTouchEnd, onTouchMove: this.onTouchMove },
        this.props.post.title,
        React.createElement('br', null),
        React.createElement(
          'small',
          { className: 'postdate' },
          created
        )
      ),
      React.createElement(
        'div',
        { ref: 'buttons', className: 'buttons' },
        React.createElement(PostButton, { label: 'Edit', href: this.props.href + "/edit" }),
        React.createElement(PostButton, { label: 'Delete', href: this.props.href + "/delete", type: 'danger' })
      )
    );
  }
});

var PostButton = React.createClass({
  displayName: 'PostButton',

  render: function render() {
    var classes = "button";
    classes = classes + (this.props.type === "danger" ? " -danger" : "");

    return React.createElement(
      'a',
      { href: this.props.href, className: classes },
      this.props.label
    );
  }
});

var NewPostRow = React.createClass({
  displayName: 'NewPostRow',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'postrow -newpost' },
      React.createElement(
        'a',
        { className: 'title', href: '/posts/new' },
        '+ New Post'
      )
    );
  }
});