import React from 'react';
import $ from 'jquery';
import StockDataTable from './StockDataTable.jsx';


class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      symb: '',
      lprice: 0,
      stockData: {"Status":"SUCCESS","Name":"","Symbol":"","LastPrice":0,"Change":0,"ChangePercent":0,"Timestamp":"","MSDate":0,"MarketCap":0,"Volume":0,"ChangeYTD":0,"ChangePercentYTD":0,"High":0,"Low":0,"Open":0},
      total: 0,
      qty: 0,
      sharesAdded: 0,
      totalAdded: 0
    }
// {"Status":"SUCCESS","Name":"Apple Inc","Symbol":"AAPL","LastPrice":143.65,"Change":-0.139999999999986,"ChangePercent":-0.0973642116976051,"Timestamp":"Fri Apr 28 00:00:00 UTC-04:00 2017","MSDate":42853,"MarketCap":753665471000,"Volume":20860358,"ChangeYTD":115.82,"ChangePercentYTD":24.0286651700915,"High":144.3,"Low":143.27,"Open":144.09},    
    this.qtyChange = this.qtyChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.getData = this.getData.bind(this);
    this.handleGetDataClick = this.handleGetDataClick.bind(this);
  }

  componentDidMount() {
    // this.getData(this.state.symb);
  }  

  getData (ticker) {
    $.post('/getAPIData', {symb: ticker})
      .then( (data) => {
        var dataParsed = JSON.parse(data);
        this.setState({
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
      qty: 0,
      total: 0,
      totalAdded: totalAdded
    })

    var addObj = {
      symb: this.state.symb,
      price: this.state.lprice,
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
      symb: this.state.symb,
      price: this.state.lprice,
      qty: this.state.qty,
      total: this.state.total
    }    
    this.props.handleRemove(removeObj);
  }

  render () {
    return (
      <div className="container">
        <div className="jumbotron">


          <h2 className="text-center">STOCK TICKER: {this.state.symb}</h2>
          <div className='text-center'>
            <form onSubmit={this.handleGetDataClick}>
              <input ref='ticker' type='text'/>
              <input className="btn btn-success btn-xs" type='submit'/>
            </form>
          </div>

          <StockDataTable stockData={this.state.stockData}/>

         <div className="row">
            <div className="col-md-6">
              <h4>Total Added: <small>${this.state.totalAdded}</small></h4> 
            </div>          
            <div className="col-md-6">
              <h4>Shares Added: <small>{this.state.sharesAdded}</small></h4> 
            </div>
          </div>

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
                <td>${this.state.lprice}</td>
                <td>{this.state.qty}</td>
                <td>${this.state.total}</td>
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
      </div>
    )
  }
}


export default Stock;