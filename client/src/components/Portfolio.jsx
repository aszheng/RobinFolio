import React from 'react';
import $ from 'jquery';
import PortfolioRows from './PortfolioRows.jsx';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company Name</th>
              <th>Price Per Share</th>
              <th>Qty</th>
              <th>Total </th>
            </tr>              
          </thead>
          <tbody>
            {this.props.allEntry.map( (entry) => <PortfolioRows rowData={entry} key={entry.symb}/> )}
          </tbody>
        </table>     
      </div>
    )
  }
}

export default Portfolio;