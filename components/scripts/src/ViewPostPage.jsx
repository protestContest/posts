var React = require('react');
if (process.env.BROWSER) require('../../styles/viewpost-layout.less');

module.exports = React.createClass({

  render: function() {
    var publishIcon = this.props.post.isPrivate ? "paragraph" : "eye-slash";
    var publishLabel = this.props.post.isPrivate ? "Publish" : "Unpublish";
    var privateIcon = this.props.post.isPrivate ? "lock" : "unlock";
    var privateLabel = this.props.post.isPrivate ? "Private" : "Public";

    return (
      <div id="content" className="viewpost-layout">
        <h1 className="page-title">
          {this.props.post.title}
        </h1>
        <div className="post-text" dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        <div className="tool-bar">
          <a className="toolbutton" href="/home">
            <i className="fa fa-2x fa-list"></i><br/>
            Posts
          </a>
          <a className="toolbutton" href={this.props.post._id + "/edit"}>
            <i className="fa fa-2x fa-pencil"></i><br/>
            Edit
          </a>
          <a className="toolbutton" href={this.props.post._id + "/publish"}>
            <i className={"fa fa-2x fa-" + publishIcon}></i><br/>
            {publishLabel}
          </a>
          <a className="toolbutton -danger" href={this.props.post._id + "/delete"}>
            <i className="fa fa-2x fa-trash"></i><br/>
            Delete
          </a>
        </div>
      </div>
    );
  }

});