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
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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

  handleAdd(addObj) {
    console.log(addObj, 'ADDOBJ');
  }
  
  handleRemove() {
    console.log('INSIDE REMOVE');
  }

  render () {
    return (<div>
      <h1>Stock Budget Allocator</h1>
      <div>
        <p>Budget: ${this.state.budget}</p>
        <p>Buying Power: ${this.state.buyingPower}</p>
      </div>
      
      <Stock handleAdd={this.handleAdd} handleRemove={this.handleRemove} symb={this.props.testData[0].symb} lprice={this.props.testData[0].lprice}/>
      <Stock handleAdd={this.handleAdd} handleRemove={this.handleRemove} symb={this.props.testData[1].symb} lprice={this.props.testData[1].lprice}/>
      <Stock handleAdd={this.handleAdd} handleRemove={this.handleRemove} symb={this.props.testData[2].symb} lprice={this.props.testData[2].lprice}/>
    </div>)
  }
}

var testData = [
  {symb: 'AAPL', lprice: 140.00},
  {symb: 'TSLA', lprice: 315.07}, 
  {symb: 'TWTR', lprice: 16.48}
]
ReactDOM.render(<App testData={testData}/>, document.getElementById('app'));

