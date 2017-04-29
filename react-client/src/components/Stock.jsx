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
    this.inputQty = '';

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
      <div className="container">
        <div className="jumbotron">
          <h2 className="text-center">STOCK TICKER: {this.props.symb}</h2>
          <p></p>
          <div className="row">
            <div className="col-md-6">
              <h4>Total Added: <small>${this.state.totalAdded}</small></h4> 
            </div>          
            <div className="col-md-6">
              <h4>Shares Added: <small>{this.state.sharesAdded}</small></h4> 
            </div>
          </div>
          <p></p>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Price: </th>
                <th>Shares: </th>
                <th>Total: </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td>${this.props.lprice}</td>
                <td>{this.state.qty}</td>
                <td>${this.state.total}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center">
            <input type="number" min="0" max="100" placeholder='qty' 
              onChange={this.qtyChange} 
              ref={el => this.inputQty = el}
            />
            <button type="submit" value="Add" onClick={this.add} 
              className="btn btn-success btn-sm">Add
            </button>
            <button type="submit" value="Remove" onClick={this.remove} 
              className="btn btn-warning btn-sm">Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}

// const divStyle = {
//   color: 'white',
//   backgroundColor:'#A9A9A9',
//   borderStyle: 'solid',
//   borderWidth: 2,  
//   borderColor: 'black', 
//   marginBottom: 5, 
// };

export default Stock;