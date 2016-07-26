import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/modal-item.less';

export default class ModalItem extends React.Component {
  render() {
    if (this.props.link) {
      return (
        <Link to={this.props.link} className='modal-item'>
          {this.props.label}
        </Link>
      );
    } else {
      return (
        <div className='modal-item'>
          {this.props.label}
        </div>
      );
    }
  }
}

ModalItem.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string
};