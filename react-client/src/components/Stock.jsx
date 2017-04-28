import React from 'react';
import ListItem from './ListItem.jsx';


class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      total: 0
    }
  }


  render () {
    return (
      <div style={divStyle}>
        <h5>AAPL</h5>
        <div>Price: $10</div>
        <div>Total: ${this.state.total} </div>
        <form>
          <label>
            <input type="text" name="name" placeholder='quantity'/>
          </label>
          <div>
            <input type="submit" value="Add" />
            <input type="submit" value="Remove" />      
          </div>
        </form>
      </div>      
    )
  }
}

const divStyle = {
  color: 'white',
  backgroundColor:'#A9A9A9',
  borderStyle: 'solid',
  borderWidth: 2,  
  borderColor: 'black', 
  marginBottom: 5, 
};

export default Stock;