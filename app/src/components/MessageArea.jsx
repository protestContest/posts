import React, { PropTypes } from 'react';
import MessageBar from './MessageBar';

export default class MessageArea extends React.Component {
  render() {
    const hideMessage = !Boolean(this.props.message);
    const hideError = !Boolean(this.props.error);

    return (
      <div className='message-area'>
        <MessageBar message={this.props.message} type='info' hidden={hideMessage} />
        <MessageBar message={this.props.error} type='error' hidden={hideError} />
      </div>
    );
  }
}

MessageArea.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string
};