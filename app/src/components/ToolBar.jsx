import React from 'react';
import '../styles/tool-bar.less';

module.exports = React.createClass({

  render: function() {
    return (
      <div className='tool-bar'>
        {this.props.children}
      </div>
    );
  }

});
