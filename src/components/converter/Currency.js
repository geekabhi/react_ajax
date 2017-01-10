import React, { Component } from 'react';
import axios from 'axios';
import jsonp from 'jsonp';

export default class Currency extends Component {

    constructor(props) {
        super(props);
        this.state = {base: 0.0, ratio: 0.0, target: 0.0};
        this.currencies = ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR", "GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"]
        this.convert = this.convert.bind(this);
    }


   convert() {

       const baseCurrency = this.base_list.value;
       const targetCurrency = this.target_list.value;
       const base = +this.base_input.value;
       //const target = +this.target_input.value;

        jsonp(`http://api.fixer.io/latest?base=${baseCurrency}`, null,  (err, res) => {
        if (err) {
            console.error(err.message);
        } else {
            const targetRate = +res.rates[targetCurrency];
            const target = targetRate*base;
            this.setState( { base: base, ratio: targetRate, target: target});

        }
        });
   }    

    render() {
        return ( 
        <div>
            <h1>Currency</h1>
                <div className="panel panel-default">
                    <div className="panel-body">
                    From :
                    <select ref={node => this.base_list = node} > { this.currencies.map((elem, index) => <option key={index}  value={elem}> {elem}</option>) } </select>
                    To :
                    <select ref={node => this.target_list = node}> { this.currencies.map((elem, index) => <option key={index} value={elem}> {elem}</option>) } </select>
                    <div>
                        Ratio: <div> {this.state.ratio} </div>
                        <div>
                            <input ref={node => this.base_input = node} type="number" placeholder="1"/>   
                        </div>
                        Converted: <div> {this.state.target} </div>
                    </div>
                    <div>
                    <button onClick={this.convert} type="button" className="btn btn-primary">Convert</button>
                    </div>
                    </div>
            </div>
            
        </div>
        );
  }
}
