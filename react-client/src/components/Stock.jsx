import React from 'react';
import ListItem from './ListItem.jsx';


class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      total: 0,
      qty: 0
    }
    this.qtyChange = this.qtyChange.bind(this);
  }

  qtyChange (e) {
    var totalCost = e.target.value * 10;
    this.setState({
      qty: e.target.value,
      total: totalCost
    })
  }


  render () {
    return (
      <div style={divStyle}>
        <h5>AAPL</h5>
        <div>Price: $10</div>
        <div>Shares: {this.state.qty} </div>
        <div>Total: ${this.state.total} </div>
        <form>
          <label>
            <input type="text" name="name" placeholder='quantity' onChange={this.qtyChange}/>
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