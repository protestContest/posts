import React from 'react';
import '../styles/scroll-content.less';

export default class ScrollContent extends React.Component {
  render() {
    return (
      <div className='scroll-content'>
        {this.props.children}
      </div>
    );
  }
}
