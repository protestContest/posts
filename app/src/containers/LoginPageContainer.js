import { connect } from 'react-redux';
import LoginPage from '../components/LoginPage';

const mapStateToProps = (state) => {
  return {
    loggingIn: state.sync.authenticating
  };
};

const LoginPageContainer = connect(mapStateToProps)(LoginPage);
export default LoginPageContainer;