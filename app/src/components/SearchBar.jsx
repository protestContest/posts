import React from 'react';
import '../styles/search-bar.less';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
    this.onChange = this.onChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange(event) {
    this.setState({ searchText: event.target.value });
    this.props.onUserInput(event.target.value);
  }

  clear() {
    this.setState({ searchText: '' });
    this.props.onUserInput('');
  }

  render() {
    const hidden = (this.state.searchText.length > 0) ? '' : ' -hidden';

    return (
      <div className='search-bar'>
        <input ref='search' className='search' placeholder='Filter' 
          onChange={this.onChange} value={this.state.searchText} />
        <i className={'delete fa fa-times-circle' + hidden} onClick={this.clear}></i>
      </div>
    );
  }

}

SearchBar.defaultProps = { onUserInput: () => {} };