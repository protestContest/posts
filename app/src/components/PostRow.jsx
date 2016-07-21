import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class PostRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      offset: 0,
      rel: 0,
      open: false,
      buttonWidth: 0
    };

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

  }

  getDefaultProps() {

  }

  onTouchStart(e) {
    if (!this.refs.buttons) return;
    var pageX = e.touches[0].pageX;

    this.setState({
      dragging: true,
      offset: 0,
      rel: pageX - ReactDOM.findDOMNode(this).getBoundingClientRect().left
    });
  }

  onTouchEnd(e) {    
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

  }

  onTouchMove(e) {
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
  }

  close() {
    var elem = ReactDOM.findDOMNode(this);

    elem.addEventListener('transitionend', function() {
      elem.style.transition = 'none';
    });
    elem.style.transition = 'transform 0.3s';

    elem.style.transform = 'translate(0)';
    this.setState({ open: false });
  }

  open() {
    var elem = ReactDOM.findDOMNode(this);
    var buttons = ReactDOM.findDOMNode(this.refs.buttons);
    var buttonsWidth = buttons.offsetWidth;

    elem.addEventListener('transitionend', function() {
      elem.style.transition = 'none';
    });
    elem.style.transition = 'transform 0.3s';

    elem.style.transform = 'translate(-' + buttonsWidth + 'px)';
    this.setState({ open: true });
  }

  render() {
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
        <Link className='title' to={this.props.href} 
            onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} onTouchMove={this.onTouchMove}>
          {this.props.post.title}
          <small className='postdate'><i className={'fa fa-' + icon}></i> {updated} </small>
        </Link>
        {toolBar}
      </div>
    );
  }
}
PostRow.defaultProps = {
  post: {
    title: '',
    created: new Date()
  },
  href: '#'
};