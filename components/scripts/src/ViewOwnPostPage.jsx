/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
if (process.env.BROWSER) require('../../styles/viewpost-layout.less');

var ViewOwnPostPage = module.exports = React.createClass({
  getInitialState: function() {
    return {
      scrollTop: 0,
      scrollDir: 'up'
    };
  },

  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this.refs.postText);
    node.addEventListener('touchmove', this.onScroll);
    node.addEventListener('touchend', this.onScroll);
  },

  onScroll: function() {
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
  },

  showBars: function() {
    var headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    var toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    headerNode.classList.remove('-hidden');
    toolbarNode.classList.remove('-hidden');
  },

  hideBars: function() {
    var headerNode = ReactDOM.findDOMNode(this.refs.pageHeader);
    var toolbarNode = ReactDOM.findDOMNode(this.refs.toolBar);
    headerNode.classList.add('-hidden');
    toolbarNode.classList.add('-hidden');
  },

  render: function() {
    var publishIcon = this.props.post.isPrivate ? 'paragraph' : 'eye-slash';
    var publishLabel = this.props.post.isPrivate ? 'Publish' : 'Unpublish';
    var publicText = this.props.post.isPrivate ? 'Private' : 'Published ' + new Date(this.props.post.published).toDateString();
    var publicIcon = this.props.post.isPrivate ? 'fa-lock' : 'fa-globe';
    var updated = new Date(this.props.post.updated).toDateString();

    return (
      <div id='content' className='viewpost-layout'>
        <div ref='pageHeader' className='page-header'>
          <div className='page-title'>
            <h1 className='title'>{this.props.post.title}</h1>
            <small className='info'>
              {updated} <i className={'fa ' + publicIcon}></i> {publicText}
            </small>
          </div>
        </div>
        <div ref='postText' className='post-text' dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        <div ref='toolBar' className='tool-bar'>
          <a className='toolbutton' href='/posts'>
            <i className='fa fa-2x fa-list'></i>
            Posts
          </a>
          <a className='toolbutton' href={this.props.post.slug + '/edit'}>
            <i className='fa fa-2x fa-pencil'></i>
            Edit
          </a>
          <a className='toolbutton' href={this.props.post.slug + '/publish'}>
            <i className={'fa fa-2x fa-' + publishIcon}></i>
            {publishLabel}
          </a>
          <a className='toolbutton -danger' href={this.props.post.slug + '/delete'}>
            <i className='fa fa-2x fa-trash'></i>
            Delete
          </a>
        </div>
      </div>
    );
  }

});

if (typeof window !== 'undefined' && data.pageName === 'ViewOwnPostPage') {
  ReactDOM.render(<ViewOwnPostPage post={data.post} />, document.getElementById('react-root'));
}