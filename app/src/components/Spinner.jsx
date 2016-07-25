import React, { PropTypes } from 'react';

export default class Spinner extends React.Component {
  render() {
    const hidden = (this.props.hidden) ? ' _hidden' : '';

    return (
      <div className='spinner-thing'>
        <i className={'fa fa-circle-o-notch fa-spin' + hidden}></i>
      </div>
    );
  }
}

Spinner.propTypes = {
  hidden: PropTypes.bool
};