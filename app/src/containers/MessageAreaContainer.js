import { connect } from 'react-redux';
import MessageArea from '../components/MessageArea';

const mapStateToProps = (state) => {
  return {
    error: state.currentError,
    syncStatus: state.syncStatus
  };
};

const MessageAreaContainer = connect(mapStateToProps)(MessageArea);
export default MessageAreaContainer;
