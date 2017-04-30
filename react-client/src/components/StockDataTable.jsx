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
            <tr className='stockInfoTable'>
              <th>%Day </th>
              <th>%YTD </th>
              <th>Market Cap </th>
              <th>52-High </th>
              <th>52-Low </th>
            </tr>              
          </thead>
          <tbody>
            <tr className='stockInfoTable'>
              <td>{Math.floor(this.props.stockData.ChangePercent * 100) / 100}</td>
              <td>{Math.floor(this.props.stockData.ChangePercentYTD * 100) / 100}</td>
              <td>{Math.floor(this.props.stockData.MarketCap/ 1000000).toLocaleString()}M</td>
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