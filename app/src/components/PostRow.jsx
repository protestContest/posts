import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import '../styles/post-row.less';

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
    this.formatDate = this.formatDate.bind(this);
    this.getPreview = this.getPreview.bind(this);
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
    var buttonsWidth = buttons.offsetWidth + 8;

    elem.addEventListener('transitionend', function() {
      elem.style.transition = 'none';
    });
    elem.style.transition = 'transform 0.3s';

    elem.style.transform = 'translate(-' + buttonsWidth + 'px)';
    this.setState({ open: true });
  }

  formatDate(date) {
    if (date instanceof Date === false) {
      date = new Date(date);
    }

    const year = date.getFullYear().toString().substring(2);

    return `${date.getMonth() + 1}/${date.getDate()}/${year}`;
  }

  getPreview(post) {
    const bodyTitle = '# ' + post.title;

    if (post.body.indexOf(bodyTitle) === 0) {
      return post.body.substring(bodyTitle.length).trim();
    } else {
      return post.body.trim();
    }
  }

  render() {
    const updated = this.formatDate(this.props.post.updated);
    const toolBar = this.props.readOnly ? '' : (
      <div ref='buttons' className='tool-bar -offcanvas'>
        <Link to={this.props.href + '/edit'} className='toolbutton'>
          <i className='fa fa-2x fa-pencil'></i>
          Edit
        </Link>
        <Link to={this.props.href + '/delete'} className='toolbutton -danger'>
          <i className='fa fa-2x fa-trash'></i>
          Delete
        </Link>
      </div>
    );

    const preview = this.getPreview(this.props.post);

    return (
      <div className='post-row'>
        <Link className='display' to={this.props.href} 
            onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} onTouchMove={this.onTouchMove}>
          <div className='info'>
            <span className='title'>{this.props.post.title}</span>
            <small className='postdate'>{updated} </small>
          </div>
          <div className='preview'>
            {preview}
          </div>
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


export class NewPostRow extends React.Component {
  render() {
    return (
      <div className='post-row -newpost'>
        <Link className='display' to='/posts/new'>
          <span className='title'>+ New Post</span>
        </Link>
      </div>
    );
  }
}

export class EndRow extends React.Component{
  render() {
    return (
      <div className='post-row -endrow'>■</div>
    );
  }
}