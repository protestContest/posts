var React = require('react');
if (process.env.BROWSER) require('../../styles/viewpost-layout.less');

module.exports = React.createClass({

  render: function() {

    return (
      <div id="content" className="viewpost-layout">
        <h1 className="page-title">{this.props.post.title}</h1>
        <div className="post-text" dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
      </div>
    );
  }

});