import { connect } from 'react-redux';
import MessageArea from '../components/MessageArea';

const mapStateToProps = (state) => {
  const message = state.sync.fetchingPosts ? 'Loading posts...'
    : (state.message && state.message.length > 0) ? state.message
    : '';

  return {
    error: state.currentError,
    message: message
  };
};

const MessageAreaContainer = connect(mapStateToProps)(MessageArea);
export default MessageAreaContainer;
