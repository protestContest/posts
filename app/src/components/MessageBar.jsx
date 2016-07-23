import React, { PropTypes } from 'react';
import '../styles/message-bar.less';

export default class MessageBar extends React.Component {
  render() {
    const typeClass = (this.props.type && this.props.type.length > 0)
      ? `-${this.props.type}` : '';
    const hideClass = (this.props.hidden) ? '-hidden' : '';

    return (<div className={`message-bar ${typeClass} ${hideClass}`}>{this.props.message}</div>);
  }
}

MessageBar.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  hidden: PropTypes.bool
};

MessageBar.defaultTypes = {
  hidden: true
};