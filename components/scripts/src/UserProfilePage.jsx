/*global data*/

var React = require('react');
var ReactDOM = require('react-dom');
var PostList = require('./PostList');
if (process.env.BROWSER) require('../../styles/profile-layout.less');

var UserProfilePage = module.exports = React.createClass({

  render: function() {
    var isSubscribed = this.props.subscription !== undefined && this.props.subscription !== null;

    var subIcon = (isSubscribed) ? 'fa-user-times' : 'fa-user-plus';
    var subText = (isSubscribed) ? 'Unsubscribe' : 'Subscribe';
    var subClass = (isSubscribed) ? '-danger' : '-action';
    var subMethod = (isSubscribed) ? 'delete' : 'post';
    var subAction = (isSubscribed) ? '/subscriptions/' + this.props.subscription._id : '/subscriptions'

    return (
      <div id='content' className='profile-layout'>
        <div ref='pageHeader' className='page-header'>
          <div className='page-title'>
            <h1 className='title'>{this.props.user.username}</h1>
          </div>
        </div>
        <PostList posts={this.props.post} />
        <div ref='toolBar' className='tool-bar'>
          <form id='subscribeForm' className='_hidden' action={subAction} method='post'>
            <input type='hidden' name='_method' value={subMethod} />
            <input type='hidden' name='target' value={this.props.user._id} />
          </form>
          <button form='subscribeForm' className={'toolbutton ' + subClass} href='/posts'>
            <i className={'fa fa-2x ' + subIcon}></i>
            {subText}
          </button>
        </div>
      </div>
    );
  }

});

if (typeof window !== 'undefined' && data.pageName === 'UserProfilePage') {
  ReactDOM.render(<UserProfilePage post={data.post} subscription={data.subscription} />, document.getElementById('react-root'));
}