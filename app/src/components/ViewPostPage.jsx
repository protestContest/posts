import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import ModalMenu from './ModalMenu';
import ModalItem from './ModalItem';
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
    this.showOptions = this.showOptions.bind(this);
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
    toolbarNode.classList.remove('-hidden');
  }

  hideBars() {
    const toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    toolbarNode.classList.add('-hidden');
  }

  showOptions() {
    this.refs.options.show();
  }

  render() {
    const published = new Date(this.props.post.updated).toDateString();

    return (
      <div id='content' className='viewpost-layout'>
        <div ref='pageHeader' className='page-header -hidden'></div>
        <div ref='postText' className='post-text'
            onTouchMove={this.onScroll} onTouchEnd={this.onScroll}>
          <div className='post-header'>
            <div className='title'>{this.props.post.title}</div>
            <div className='info'>
              <div className='date'>{published}</div>
              <div className='actions'>
                <div className='text-link' onClick={this.showOptions}>Options</div>
              </div>
            </div>
          </div>
          <div className='body' dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        </div>
        <NavBar ref='toolBar' />

        <ModalMenu ref='options'>
          <div className='title'>Options</div>
          <ModalItem icon='edit' label='Edit' link={`/posts/${this.props.post.slug}/edit`} />
          <ModalItem icon='globe' label='Publish' />
          <ModalItem icon='trash' label='Delete' />
        </ModalMenu>
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