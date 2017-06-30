import React from 'react';
import $ from 'jquery';
import StockDataTable from './StockDataTable.jsx';


class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      symb: '',
      companyName: '',
      lprice: 0,
      stockData: {"Name":"","Symbol":"","LastPrice":0,"MarketCap":0,"Volume":0,"ChangePercent":0,"ChangePercentYTD":0,"High":0,"Low":0,"Open":0},
      total: 0,
      qty: 0,
    }

    this.qtyChange = this.qtyChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.getData = this.getData.bind(this);
    this.handleGetDataClick = this.handleGetDataClick.bind(this);
  }


  getData (ticker) {
    $.post('/getAPIData', {symb: ticker})
      .then( (data) => {
        var dataParsed = JSON.parse(data);
        this.setState({
          lprice: dataParsed.LastPrice,
          companyName: dataParsed.Name,
          symb: dataParsed.Symbol,
          stockData: dataParsed
        });
      })
    this.refs.ticker.value = '';    
  }

  handleGetDataClick (e) {
    e.preventDefault();
    var ticker = this.refs.ticker.value;
    this.getData(ticker);
  }

  qtyChange (e) {
    var totalCost = e.target.value * this.state.lprice;
    this.setState({
      qty: e.target.value,
      total: totalCost
    })
  }

  add () {  
    var addObj = {
      companyName: this.state.companyName,
      symb: this.state.symb,
      price: this.state.lprice,
      qty: this.state.qty,
      total: this.state.total
    }
    this.props.handleAdd(addObj);

    this.setState({
      qty: 0,
      total: 0,
    })
  }

  remove () {
    var removeObj = {
      companyName: this.state.companyName,
      symb: this.state.symb,
      price: this.state.lprice,
      qty: this.state.qty,
      total: this.state.total
    }    
    this.props.handleRemove(removeObj);

    this.setState({
      sharesAdded: 0,
      totalAdded: 0
    })    
  }

  render () {
    return (
        <div>
          <div>
            <form onSubmit={this.handleGetDataClick}>
              <input ref='ticker' type='text'/>
              <input  className="btn btn-success btn-xs" type='submit' placeholder="Enter Ticker..."/>
            </form>
          </div> 

          <h4>Company <small>{this.state.companyName}</small></h4>
          <h4>Ticker <small>{this.state.symb}</small></h4>

          <StockDataTable stockData={this.state.stockData}/>

          <table className="table table-hover">
            <thead>
              <tr className='stockInfoTable'>
                <th>Last Price </th>
                <th>Shares </th>
                <th>Total </th>
              </tr>              
            </thead>
            <tbody>
              <tr className='stockInfoTable'>
                <td>${this.state.lprice.toLocaleString()}</td>
                <td>{this.state.qty}</td>
                <td>${this.state.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center">
            <input type="number" min="0" max="100" value={this.state.qty} 
              onChange={this.qtyChange} 
            />
            <button type="submit" value="Add" onClick={this.add} 
              className="btn btn-success btn-xs">Add
            </button>
            <button type="submit" value="Remove" onClick={this.remove} 
              className="btn btn-warning btn-xs">Remove
            </button>
          </div>
      </div>
    )
  }
}


export default Stock;
