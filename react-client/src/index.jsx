import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Stock from './components/Stock.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      budget: 1000,
      buyingPower: 1000,
      items: []
    }
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    return (<div>
      <h1>Stock Budget Allocator</h1>
      <div>
        <p>Budget: ${this.state.budget}</p>
        <p>Buying Power: ${this.state.buyingPower}</p>
      </div>
      <Stock />
      <Stock />
      <Stock />      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));