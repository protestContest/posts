import { connect } from 'react-redux';
import authenticate from '../actions';
import LoginForm from '../components/LoginForm';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(authenticate(username, password))
  };
};

const LoginFormContainer = connect(null, mapDispatchToProps)(LoginForm);
export default LoginFormContainer;