import React, { Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  
  state = {
    value: ''
  }

  changeInputValue = (value) => {
    this.setState({value});
    this.props.onSearchChange(value);
  }

  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={event => this.changeInputValue(event.target.value)}
                value={this.state.value} />
    );
  }
};

//using hooks
// const SearchPanel = ({onChange}) => {
//   const [value, setValue] = useState('');

//   return (
//     <input type="text"
//               className="form-control search-input"
//               placeholder="type to search"
//               onChange={event => {
//                 setValue(event.target.value);
//                 onChange(event.target.value);
//               }}
//               value={value} />
//   );
// };

// export default SearchPanel;
