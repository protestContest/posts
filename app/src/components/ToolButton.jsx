import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class ToolButton extends React.Component {
  render() {
    const activeClass = this.props.active ? ' -active' : '';

    return (
      <Link className={`toolbutton ${activeClass}`} to={this.props.href}>
        <i className={'fa fa-2x fa-' + this.props.icon}></i>
        {this.props.label}
      </Link>
    );
  }
}

ToolButton.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
};

ToolButton.defaultProps = {
  active: false,
  href: '/posts',
  icon: 'link',
  label: 'Button'
};