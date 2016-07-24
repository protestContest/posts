import React, { PropTypes } from 'react';
import '../styles/tool-bar.less';

export default class ToolBar extends React.Component {
  render() {
    return (
      <div className={'tool-bar ' + this.props.type}>
        {this.props.children}
      </div>
    );
  }
}

ToolBar.propTypes = {
  type: PropTypes.string
};

ToolBar.defaultProps = {
  type: ''
};