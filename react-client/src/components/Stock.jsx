import React from 'react';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      total: 0,
      qty: 0,
      sharesAdded: 0,
      totalAdded: 0
    }
    this.qtyChange = this.qtyChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);

  }

  qtyChange (e) {
    var totalCost = e.target.value * this.props.lprice;
    this.setState({
      qty: e.target.value,
      total: totalCost
    })
  }

  add () {  
    var sharesAdded = this.state.qty + this.state.sharesAdded;
    var totalAdded = this.state.total + this.state.totalAdded;

    this.setState({
      sharesAdded: sharesAdded,
      totalAdded: totalAdded
    })

    var addObj = {
      symb: this.props.symb,
      price: this.props.lprice,
      qty: this.state.qty,
      total: this.state.total
    }
    this.props.handleAdd(addObj);
  }

  remove () {
    this.setState({
      sharesAdded: 0,
      totalAdded: 0
    })    

    var removeObj = {
      symb: this.props.symb,
      price: this.props.lprice,
      qty: this.state.qty,
      total: this.state.total
    }    
    this.props.handleRemove(removeObj);
  }

  render () {
    return (
      <div style={divStyle}>
        <h5>STOCK TICKER: {this.props.symb}</h5>
        <div>Price: ${this.props.lprice}</div>
        <div>Shares: {this.state.qty} </div>
        <div>Total: ${this.state.total} </div> <p></p>
        <div>Shares Added: ${this.state.sharesAdded} </div>
        <div>Total Added: ${this.state.totalAdded} </div>                
        <form>
            <input type="number" placeholder='quantity' onChange={this.qtyChange}/>
        </form>
        <button type="submit" value="Add" onClick={this.add}>Add</button>
        <button type="submit" value="Remove" onClick={this.remove}>Remove</button>
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