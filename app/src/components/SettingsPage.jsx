import React from 'react';
import MessageArea from './MessageArea';
import SettingsForm from './SettingsForm';
import NavBar from './NavBar';
import '../styles/settings-page.less';

export default class SettingsPage extends React.Component {
  render() {
    return (
      <div className='settings-page'>
        <MessageArea />
        <div className='page-header'>
          <div className='page-title'>
            <div className='title'>Settings</div>
          </div>
        </div>
        <SettingsForm />
        <NavBar currentPage='settings' />
      </div>
    );
  }
}