import { connect } from 'react-redux';
import { authenticate } from '../actions';
import LoginForm from '../components/LoginForm';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => {
      return dispatch(authenticate(username, password))
        .then(() => ownProps.onLogin());
    }
  };
};

const LoginFormContainer = connect(null, mapDispatchToProps)(LoginForm);
export default LoginFormContainer;