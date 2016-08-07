import React from 'react';
import PasswordForm from './PasswordForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../actions';
import '../styles/settings-form.less';

class SettingsForm extends React.Component {
  render() {
    return (
      <div className='settings-form'>
        <div className='group'>
          <div className='label'>Username
            <div className='value'>{this.props.user.username}</div>
          </div>
        </div>
        <div className='group'>
          <div className='title'>Change password</div>
          <PasswordForm />
        </div>
        <div className='group'>
          <div className='text-link _centertext' onClick={this.props.logout}>
            Log out
          </div>
        </div>
        <div className='group'>
          <div className='label'>App Version
            <div className='value'>{this.props.appVersion}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    appVersion: state.appVersion
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout())
      .then(() => {
        ownProps.router.push('/login');
      })
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsForm));