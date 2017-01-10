import React, { Component } from 'react';
import axios from 'axios';

export default class Random extends Component {
  constructor(props){
      super(props);
      this.state = {data: []};
      this.fetch = this.fetch.bind(this);
  }

  fetch() {
      const num = +this.number.value;
      axios.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${num}&type=uint8`)
        .then((response) => {
            const data = response.data.data;
            this.setState({data});
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  render() {
    return (
        <div>
            <h1>Random</h1>
            <div className="input-group">
                <input ref={node => this.number = node} type="number" id="Random"/>
                <button onClick={this.fetch} type="button" className="btn btn-primary">Fetch</button>
            </div>
            <div>
            <ul>
            {this.state.data.map((num,index) => <li key={index}>{num}</li>)}
            </ul>
            </div>
        </div>
    );
  }
}