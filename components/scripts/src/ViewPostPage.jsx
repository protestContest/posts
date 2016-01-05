var React = require('react');
if (process.env.BROWSER) require('../../styles/home-layout.less');

module.exports = React.createClass({

  render: function() {

    return (
      <div id="content" className="viewpost-layout">
        <h1 className="page-title">{this.props.post.title}</h1>
        {this.props.post.body}
      </div>
    );
  }

});