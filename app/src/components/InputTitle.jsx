import React from 'react';
import '../../styles/input-title.less';

export default class InputTitle extends React.component {
  render() {
    return (
      <input className="input-title" name={this.props.name} form={this.props.form} placeholder={this.props.placeholder} defaultValue={this.props.value} required />
    );
  }
}