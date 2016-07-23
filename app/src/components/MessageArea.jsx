import React, { PropTypes } from 'react';
import MessageBar from './MessageBar';

export default class MessageArea extends React.Component {
  render() {
    const hideSync = !Boolean(this.props.syncStatus);
    const hideError = !Boolean(this.props.error);

    return (
      <div className='message-area'>
        <MessageBar message={this.props.syncStatus} type='info' hidden={hideSync} />
        <MessageBar message={this.props.error} type='error' hidden={hideError} />
      </div>
    );
  }
}

MessageArea.propTypes = {
  syncStatus: PropTypes.string,
  error: PropTypes.string
};