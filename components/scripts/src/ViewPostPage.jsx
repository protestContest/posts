var React = require('react');
if (process.env.BROWSER) require('../../styles/viewpost-layout.less');

module.exports = React.createClass({

  render: function() {
    var publishIcon = this.props.post.isPrivate ? 'paragraph' : 'eye-slash';
    var publishLabel = this.props.post.isPrivate ? 'Publish' : 'Unpublish';
    return (
      <div id='content' className='viewpost-layout'>
        <div className='page-title'>
          <h1 className='title'>{this.props.post.title}</h1>
        </div>
        <div className='post-text' dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        <div className='tool-bar'>
          <a className='toolbutton' href='/home'>
            <i className='fa fa-2x fa-list'></i>
            Posts
          </a>
          <a className='toolbutton' href={this.props.post._id + '/edit'}>
            <i className='fa fa-2x fa-pencil'></i>
            Edit
          </a>
          <a className='toolbutton' href={this.props.post._id + '/publish'}>
            <i className={'fa fa-2x fa-' + publishIcon}></i>
            {publishLabel}
          </a>
          <a className='toolbutton -danger' href={this.props.post._id + '/delete'}>
            <i className='fa fa-2x fa-trash'></i>
            Delete
          </a>
        </div>
      </div>
    );
  }

});