import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ToolBar from './ToolBar';
import ToolButton from './ToolButton';
import BackButton from './BackButton';
import '../styles/viewpost-layout.less';
import '../styles/text-link.less';

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
    this.toggleOptions = this.toggleOptions.bind(this);
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
    const toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    const headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    toolbarNode.classList.remove('-hidden');
    headerNode.classList.remove('-hidden');
  }

  hideBars() {
    const toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    const headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    toolbarNode.classList.add('-hidden');
    headerNode.classList.add('-hidden');
  }

  toggleOptions() {
    const headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    headerNode.classList.toggle('-hidden');
  }

  render() {
    const published = new Date(this.props.post.updated).toDateString();
    const actions = (!this.props.readOnly) ? (
      <div className='actions'>
        <div className='text-link' onClick={this.toggleOptions}>Options</div>
      </div>
      ) : '';

    return (
      <div id='content' className='viewpost-layout'>
        <div ref='pageHeader' className='page-header -hidden'>
          <ToolBar>
            <BackButton />
            <ToolButton icon='edit' label='Edit' href={`/posts/${this.props.post.slug}/edit`} />
            <ToolButton icon='globe' label='Publish' />
            <ToolButton icon='trash' label='Delete' href={`/posts/${this.props.post.slug}/delete`} />
          </ToolBar>
        </div>
        <div ref='postText' className='post-text'
            onTouchMove={this.onScroll} onTouchEnd={this.onScroll}>
          <div className='post-header'>
            <div className='title'>{this.props.post.title}</div>
            <div className='info'>
              <div className='date'>{published}</div>
              {actions}
            </div>
          </div>
          <div className='body' dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        </div>
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