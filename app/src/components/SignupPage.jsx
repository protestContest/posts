import React from 'react';
var SignupForm = require('./SignupForm');
import '../../styles/index-layout.less';

module.exports = React.createClass({
  render: function() {
    return (
      <div id='content' className='index-layout'>
        <div className='site-title'>
          <h1 className='header'>Posts</h1>
        </div>
        <SignupForm />
      </div>
    );
  }
});