import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Stock from './components/Stock.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      budget: 1000,
      buyingPower: 0,
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.countTotal = this.countTotal.bind(this);    
    this.clearAll = this.clearAll.bind(this);    
    this.fetch = this.fetch.bind(this);    
  }

  componentDidMount() {
    this.fetch();
  }

  fetch(){
    $.get('/buyingPower').done( (data) => {
      this.countTotal(data);    
    })    
  }

  countTotal(data) {
    var curTotal = 0;
    data.forEach( (order) => {curTotal += order.total;})
    var curPower = this.state.budget - curTotal;
    this.setState({
      buyingPower: curPower
    })
    return;   
  }

  clearAll() {
    $.post('/clearAll').done();
    this.fetch();
  }  

  handleAdd(addObj) {
    $.post('/add', addObj).done( (data) => {
      if (data.length > 0) {
        this.countTotal(data);
      }
    }).catch( (err) => {
      console.log('ERROR with ADD - HANDLE ADD')
    })
  }
  
  handleRemove(removeObj) {
    $.post('/remove', removeObj).done ( (data) => {
      console.log('DATA @ REMOVE', data);
      if (data.length > 0) {
        this.countTotal(data);
      } else {
        var curPower = this.state.budget;
        this.setState({
          buyingPower: curPower
        })        
      }
    })
  }

  render () {
    return (<div>
      <h1>RobinHack</h1>
      <div>
        <p>Budget: ${this.state.budget}</p>
        <p>Buying Power: ${this.state.buyingPower}</p>
      </div>

      <button onClick={this.clearAll}> Clear All </button>
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

