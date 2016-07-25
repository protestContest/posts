import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import NavBar from './NavBar';
import '../styles/viewpost-layout.less';

export default class ViewPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      scrollDir: 'up'      
    };

    this.onScroll = this.onScroll.bind(this);
    this.hideBars = this.hideBars.bind(this);
    this.showBars = this.showBars.bind(this);
  }

  onScroll() {
    var node = ReactDOM.findDOMNode(this.refs.postText);
    var deltaScroll = node.scrollTop - this.state.scrollTop;
    var scrollThreshhold = 20;

    if (deltaScroll > 0) {
      // scrolling down
      if (this.state.scrollDir === 'up') {
        this.setState({scrollDir: 'down', scrollDist: 0});
      } else if (this.state.scrollDist > scrollThreshhold) {
        this.hideBars();
      } else {
        this.setState({scrollDist: this.state.scrollDist + Math.abs(deltaScroll)});
      }
    } else {
      // scrolling up
      if (this.state.scrollDir === 'down') {
        this.setState({scrollDir: 'up', scrollDist: 0});
      } else if (this.state.scrollDist > scrollThreshhold) {
        this.showBars();
      } else {
        this.setState({scrollDist: this.state.scrollDist + Math.abs(deltaScroll)});
      }
    }

    this.setState({scrollTop: node.scrollTop});
  }

  showBars() {
    const headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    const toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    if (headerNode) headerNode.classList.remove('-hidden');
    toolbarNode.classList.remove('-hidden');
  }

  hideBars() {
    const headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    const toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    if (headerNode) headerNode.classList.add('-hidden');
    toolbarNode.classList.add('-hidden');
  }

  render() {
    const published = new Date(this.props.post.updated).toDateString();
    const headerHidden = (this.props.readOnly) ? '-hidden' : '';

    return (
      <div id='content' className='viewpost-layout'>
        <div ref='pageHeader' className={'page-header ' + headerHidden}>
          <ToolBar>
            <ToolButton icon='edit' label='Edit' href={`/posts/${this.props.post.slug}/edit`} />
            <ToolButton icon='globe' label='Publish' />
            <ToolButton icon='trash' label='Delete' />
          </ToolBar>
        </div>
        <div ref='postText' className='post-text'
            onTouchMove={this.onScroll} onTouchEnd={this.onScroll}>
          <div className='header'>
            <div className='title'>{this.props.post.title}</div>
            <div className='date'>{published}</div>
          </div>
          <div className='body' dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        </div>
        <NavBar ref='toolBar' />
      </div>
    );
  }

}

ViewPostPage.propTypes = {
  post: PropTypes.shape({
    published: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired,
  readOnly: PropTypes.bool.isRequired
};