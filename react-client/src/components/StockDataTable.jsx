import React from 'react';
import $ from 'jquery';

class StockDataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr className='text-centered'>
              <th>Last Price: </th>
              <th>% Change: </th>
              <th>% Change YTD: </th>
              <th>Market Cap: </th>
              <th>Volume: </th>
              <th>52 Week High: </th>
              <th>52 Week Low: </th>
            </tr>              
          </thead>
          <tbody>
            <tr>
              <td>${this.props.stockData.LastPrice.toLocaleString()}</td>
              <td>{Math.floor(this.props.stockData.ChangePercent * 100) / 100}</td>
              <td>{Math.floor(this.props.stockData.ChangeYTD * 100) / 100}</td>
              <td>{Math.floor(this.props.stockData.MarketCap/ 1000000).toLocaleString()}M</td>
              <td>{Math.floor(this.props.stockData.Volume/ 1000000).toLocaleString()}M</td>
              <td>${this.props.stockData.High}</td>
              <td>${this.props.stockData.Low}</td>
            </tr>
          </tbody>
        </table>     
      </div>
    )
  }
}

export default StockDataTable;