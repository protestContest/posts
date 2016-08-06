import React from 'react';
import { connect } from 'react-redux';
import { setError, changePassword } from '../actions';
import '../styles/vertical-form.less';

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.changePass = this.changePass.bind(this);
  }

  changePass() {
    const curPass = this.refs.curPass.value;
    const newPass = this.refs.newPass.value;
    const confirmPass = this.refs.confirmPass.value;

    if (curPass !== this.props.user.password) {
      this.props.wrongPassword();
    } else if (newPass.length === 0) {
      this.props.requiredPassword();
    } else if (newPass !== confirmPass) {
      this.props.mismatchPassword();
    } else {
      this.props.changePassword(newPass);
    }
  }

  render() {
    return (
      <div className='vertical-form -compact'>
        <div className='inputrow'>
          <label className='label'>Current password</label>
          <input ref='curPass' type='password' className='text' />
        </div>
        <div className='inputrow'>
          <label className='label'>New password</label>
          <input ref='newPass' type='password' className='text' />
        </div>
        <div className='inputrow'>
          <label className='label'>Confirm password</label>
          <input ref='confirmPass' type='password' className='text' />
        </div>
        <div className='submitrow'>
          <div className='text-link _centertext' onClick={this.changePass}>
            Change password
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    wrongPassword: () => dispatch(setError('Incorrect password')),
    requiredPassword: () => dispatch(setError('New password cannot be blank')),
    mismatchPassword: () => dispatch(setError('Passwords don\'t match')),
    changePassword: (password) => dispatch(changePassword(password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);