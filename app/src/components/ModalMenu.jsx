import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal-menu.less';

export default class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    const node = ReactDOM.findDOMNode(this);
    node.classList.remove('_hidden');
    setTimeout(() => node.classList.add('-active'), 17);
  }

  hide() {
    const node = ReactDOM.findDOMNode(this);
    node.classList.remove('-active');
    node.addEventListener('transitionend', function remove() {
      node.classList.add('_hidden');
      node.removeEventListener('transitionend', remove);
    });
  }

  render() {
    return (
      <div className='modal-menu _hidden' onClick={this.hide}>
        <div className='content' onClick={(e) => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}