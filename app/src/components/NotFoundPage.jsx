import React from 'react';
import '../styles/notfound-page.less';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className='notfound-page'>
        <div className='message'>
          <div className='title'>Oh no!</div>
          <div className='subtitle'>We couldn't find what you were looking for.</div>
        </div>
        <div className='backlink' onClick={this.props.history.goBack}>Go back</div>
        <div className='graphic'>
          <img className='icon' src='/images/astronaut.png' />
        </div>
      </div>
    );
  }
}