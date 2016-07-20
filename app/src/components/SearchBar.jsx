import React from 'react';

module.exports = React.createClass({

  getDefaultProps: function() {
    return { onUserInput: function() {} };
  },

  onChange: function() {
    this.props.onUserInput(this.refs.search.value);
  },

  render: function() {    
    return (
      <div className='search-bar'>
        <input ref='search' className='search' placeholder='Filter' onChange={this.onChange} />
      </div>
    );
  }

});