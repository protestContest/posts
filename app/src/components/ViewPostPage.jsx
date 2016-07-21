import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import '../styles/viewpost-layout.less';

export default class ViewPostPage extends React.Component {
  getInitialState() {
    return {
      scrollTop: 0,
      scrollDir: 'up'
    };
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs.postText);
    node.addEventListener('touchmove', this.onScroll);
    node.addEventListener('touchend', this.onScroll);
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
    var published = new Date(this.props.post.published).toDateString();

    return (
      <div id='content' className='viewpost-layout'>
        <div ref='pageHeader' className='page-header'>
          <div className='page-title'>
            <h1 className='title'>{this.props.post.title}</h1>
            <small className='info'>
              <i className='fa fa-globe'></i> {published}
            </small>
          </div>
        </div>
        <div ref='postText' className='post-text' dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        <div ref='toolBar' className='tool-bar'>
          <a className='toolbutton' href='/feed'>
            <i className='fa fa-2x fa-newspaper-o'></i>
            Feed
          </a>
          <a className='toolbutton' href={'/users/' + this.props.post.owner.username}>
            <i className='fa fa-2x fa-user'></i>
            Author
          </a>
          <a className='toolbutton' href={'/posts/' + this.props.post.slug + '/reply'}>
            <i className='fa fa-2x fa-pencil-square-o'></i>
            Respond
          </a>
        </div>
      </div>
    );
  }

}

ViewPostPage.propTypes = {
  post: PropTypes.shape({
    published: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired
};