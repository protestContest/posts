import React from 'react';
import { withRouter } from 'react-router';
import ToolButton from './ToolButton';

class BackButton extends ToolButton {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.router.goBack();
  }

  render() {
    return (
      <div className='toolbutton' onClick={this.goBack}>
        <i className='fa fa-2x fa-chevron-left'></i>
        Back
      </div>
    );
  }
}

export default withRouter(BackButton);