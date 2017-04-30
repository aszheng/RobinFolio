import React from 'react';
import $ from 'jquery';

class PortfolioRows extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <tr>
        <td>{this.props.rowData.symb}</td>
        <td>{this.props.rowData.companyName}</td>
        <td>${this.props.rowData.price.toLocaleString()}</td>
        <td>{this.props.rowData.qty}</td>
        <td>${this.props.rowData.total.toLocaleString()}</td>
      </tr>
    )
  }
}

export default PortfolioRows;