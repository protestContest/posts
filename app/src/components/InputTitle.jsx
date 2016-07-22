import React, { PropTypes } from 'react';
import '../styles/input-title.less';

export default class InputTitle extends React.Component {
  render() {
    return (
      <input className='input-title'
        placeholder={this.props.placeholder} 
        value={this.props.value}
        onChange={this.props.onChange} />
    );
  }
}

InputTitle.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputTitle.defaultProps = {
  placeholder: 'Title'
};