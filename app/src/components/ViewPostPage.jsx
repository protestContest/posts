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
    var headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    var toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    headerNode.classList.remove('-hidden');
    toolbarNode.classList.remove('-hidden');
  }

  hideBars() {
    var headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    var toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    headerNode.classList.add('-hidden');
    toolbarNode.classList.add('-hidden');
  }

  render() {
    var published = new Date(this.props.post.updated).toDateString();

    return (
      <div id='content' className='viewpost-layout'>
        <div ref='pageHeader' className='page-header'>
          <div className='page-title'>
            <h1 className='title'>{this.props.post.title}</h1>
            <small className='info'>{published}</small>
          </div>
          <ToolBar>
            <ToolButton icon='edit' label='Edit' href={`/posts/${this.props.post.slug}/edit`} />
          </ToolBar>
        </div>
        <div ref='postText' className='post-text'
          onTouchMove={this.onScroll} onTouchEnd={this.onScroll}
          dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
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
  }).isRequired
};