import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Stock from './components/Stock.jsx';
import Portfolio from './components/Portfolio.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      budget: 1000,
      buyingPower: 0,
      allEntry: []
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.countTotal = this.countTotal.bind(this);    
    this.clearAll = this.clearAll.bind(this);    
    this.fetch = this.fetch.bind(this);    
  }

  componentDidMount() {this.fetch();}

  fetch(){
    $.get('/buyingPower')
      .done( (data) => {
        this.countTotal(data);    
        this.setState({
          allEntry: data 
        })
      })
      .catch( (err) => {
        console.log('ERROR with GET - FETCH')
      })    
  }

  countTotal(data) {
    var curTotal = 0;
    data.forEach( (order) => {curTotal += order.total;})
    var curPower = this.state.budget - curTotal;
    this.setState({buyingPower: curPower})
  }

  clearAll() {
    $.post('/clearAll').done();
    this.fetch();
  }  

  handleAdd(addObj) {
    $.post('/add', addObj).done( (data) => {
      console.log('went into HANDLE ADD DONE')
      this.fetch();

    }).catch( (err) => {
      console.log('ERROR with ADD - HANDLE ADD')
    })
  }
  
  handleRemove(removeObj) {
    $.post('/remove', removeObj).done ( (data) => {
      this.fetch();
    })
  }

  render () {
    return (
      <div className="row">
        <h1 className="text-center" id='robinfolio'> RobinFolio </h1>
        
        <div className='container'>
          <div className='col-md-6 col-md-offset-3'>
            <div className="row" >
              <div className='col-xs-6' >
                <h4>Budget: <small> ${this.state.budget.toLocaleString()} </small></h4> 
              </div>          
              <div className='col-xs-6' >
                <h4>Buying Power: <small> ${this.state.buyingPower.toLocaleString()} </small></h4> 
              </div>              
            </div>
          </div>
        </div>     

        <div className='container'>
          <div className='jumbotron'>
            <h1><small>Portfolio</small></h1>
            <p></p>
            <Portfolio allEntry={this.state.allEntry} />
            <button className="btn btn-warning btn-xs" onClick={this.clearAll}> Clear All </button>
          </div>
        </div>

        <div className='container'>
          <div className="row">
            <div className='col-md-4' id='stockcomponent'>
              <Stock handleAdd={this.handleAdd} handleRemove={this.handleRemove} />
            </div>        
            <div className='col-md-4' id='stockcomponent'>
              <Stock handleAdd={this.handleAdd} handleRemove={this.handleRemove} />
            </div>        
            <div className='col-md-4' id='stockcomponent'>
              <Stock handleAdd={this.handleAdd} handleRemove={this.handleRemove} />
            </div>
          </div>
        </div>


    </div>
    )
  }
}

// var testData = [
//   {symb: 'AAPL', lprice: 140.00},
//   {symb: 'TSLA', lprice: 315.07}, 
//   {symb: 'TWTR', lprice: 16.48}
// ]

ReactDOM.render(<App />, document.getElementById('app'));

