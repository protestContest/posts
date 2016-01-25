var React = require('react');

module.exports = React.createClass({

  render: function() {
    
    return (
      <div className='search-bar'>
        <input className='search' placeholder='Filter' />
      </div>
    );
  }

});