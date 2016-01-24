/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/profile-layout.less');

var UserProfilePage = module.exports = React.createClass({

  render: function() {
    return (
      <div id='content' className='profile-layout'>
        <div ref='pageHeader' className='page-header'>
          <div className='page-title'>
            <h1 className='title'>{this.props.user.username}</h1>
          </div>
        </div>
        <PostList posts={this.props.post} />
        <div ref='toolBar' className='tool-bar'>
          <form id='subscribeForm' className='_hidden' action='/subscriptions' method='post'>
            <input type='hidden' name='target' value={this.props.user._id} />
          </form>
          <button form='subscribeForm' className='toolbutton' href='/posts'>
            <i className='fa fa-2x fa-rss'></i>
            Subscribe
          </button>
        </div>
      </div>
    );
  }

});

if (typeof window !== 'undefined' && data.pageName === 'UserProfilePage') {
  ReactDOM.render(<UserProfilePage post={data.post} />, document.getElementById('react-root'));
}