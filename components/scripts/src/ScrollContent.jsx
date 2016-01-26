var React = require('react');
var ReactDOM = require('react-dom');
var SearchBar = require('./SearchBar');
if (process.env.BROWSER) require('../../styles/scroll-content.less');

module.exports = React.createClass({

  render: function() {
    return (
      <div className='scroll-content'>
        {this.props.children}
      </div>
    );
  }

});
