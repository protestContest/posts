import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => {
  const message = state.sync.fetchingPosts ? 'Loading posts...'
    : (state.message && state.message.length > 0) ? state.message
    : '';

  return {
    error: state.currentError,
    message: message
  };
};

export default connect(mapStateToProps)(MessageArea);