/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/home-layout.less');

var HomePage = module.exports = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.posts.map(function(post) {
        post.created = new Date(post.created);
      })
    };
  },

  componentDidMount: function() {
    // console.log('Viewing home page');
  },

  render: function() {
    return (
      <div id='content' className='home-layout'>
        <div className='page-header'>
          <div className='page-title'>
            <h1 className='title'>Posts</h1>
          </div>
          <div className='tool-bar'>
            <a href='/logout' className='toolbutton'>
              <i className='fa fa-2x fa-sign-out'></i>
              Log out
            </a>
          </div>
        </div>
        <PostList posts={this.props.posts} />
      </div>
    );
  }

});

if (typeof window !== 'undefined' && data.pageName === 'HomePage') {
  ReactDOM.render(<HomePage posts={data.posts} />, document.getElementById('react-root'));
}