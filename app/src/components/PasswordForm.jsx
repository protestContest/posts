import React from 'react';
import '../styles/password-form.less';

export default class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.changePass = this.changePass.bind(this);
  }

  changePass() {

  }

  render() {
    return (
      <div className='vertical-form -compact'>
        <div className='inputrow'>
          <label className='label'>Current password</label>
          <input type='password' className='text' />
        </div>
        <div className='inputrow'>
          <label className='label'>New password</label>
          <input type='password' className='text' />
        </div>
        <div className='inputrow'>
          <label className='label'>Confirm password</label>
          <input type='password' className='text' />
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