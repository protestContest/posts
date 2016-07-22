import React from 'react';
import '../styles/search-bar.less';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.onUserInput(this.refs.search.value);
  }

  render() {    
    return (
      <div className='search-bar'>
        <input ref='search' className='search' placeholder='Filter' onChange={this.onChange} />
      </div>
    );
  }

}

SearchBar.defaultProps = { onUserInput: () => {} };