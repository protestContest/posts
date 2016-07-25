import { connect } from 'react-redux';
import MessageArea from '../components/MessageArea';

const mapStateToProps = (state) => {
  const syncStatus = state.sync.fetchingPosts ? 'Loading posts...'
    : '';

  return {
    error: state.currentError,
    syncStatus: syncStatus
  };
};

const MessageAreaContainer = connect(mapStateToProps)(MessageArea);
export default MessageAreaContainer;
