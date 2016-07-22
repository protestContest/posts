import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/error-bar.less';

class ErrorBarDisplay extends React.Component {
  render() {
    if (this.props.error) {
      return (<div className='error-bar'>{this.props.error}</div>);
    } else {
      return null;
    }
  }
}

ErrorBarDisplay.propTypes = { error: PropTypes.string };

const mapStateToProps = (state) => ({ error: state.currentError });

const ErrorBar = connect(mapStateToProps)(ErrorBarDisplay);
export default ErrorBar;