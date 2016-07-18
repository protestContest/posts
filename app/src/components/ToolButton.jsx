import React from 'react';

module.exports = React.createClass({

  stopClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  render: function() {
    var classes = 'toolbutton' + (this.props.active ? ' -active' : '');
    var href = this.props.href || '#';
    var onClick = this.props.active ? this.stopClick : '';

    return (
      <a className={classes} href={href} onClick={onClick}>
        <i className={'fa fa-2x fa-' + this.props.icon}></i>
        {this.props.label}
      </a>
    );
  }

});
