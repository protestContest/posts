var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <div className='tool-bar'>
        {this.props.children}
      </div>
    );
  }

});
