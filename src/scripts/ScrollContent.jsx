var React = require('react');
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
