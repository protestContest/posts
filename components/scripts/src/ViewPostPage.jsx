var React = require('react');
if (process.env.BROWSER) require('../../styles/viewpost-layout.less');

module.exports = React.createClass({

  render: function() {
    var publishIcon = this.props.post.isPrivate ? 'paragraph' : 'eye-slash';
    var publishLabel = this.props.post.isPrivate ? 'Publish' : 'Unpublish';
    var publicText = this.props.post.isPrivate ? 'Private' : 'Public';
    var publicIcon = this.props.post.isPrivate ? 'fa-lock' : 'fa-globe';
    
    return (
      <div id='content' className='viewpost-layout'>
        <div className='page-header'>
          <div className='page-title'>
            <h1 className='title'>{this.props.post.title}</h1>
            <small className='info'><i className={'fa ' + publicIcon}></i> {publicText}</small>
          </div>
        </div>
        <div className='post-text' dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        <div className='tool-bar'>
          <a className='toolbutton' href='/home'>
            <i className='fa fa-2x fa-list'></i>
            Posts
          </a>
          <a className='toolbutton' href={this.props.post.slug + '/edit'}>
            <i className='fa fa-2x fa-pencil'></i>
            Edit
          </a>
          <a className='toolbutton' href={this.props.post.slug + '/publish'}>
            <i className={'fa fa-2x fa-' + publishIcon}></i>
            {publishLabel}
          </a>
          <a className='toolbutton -danger' href={this.props.post.slug + '/delete'}>
            <i className='fa fa-2x fa-trash'></i>
            Delete
          </a>
        </div>
      </div>
    );
  }

});