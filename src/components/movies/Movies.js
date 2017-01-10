import React, { Component } from 'react';
import axios from 'axios';
import PouchDB from 'pouchdb';

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.db = new PouchDB('movies');
        this.state = {results: [], movies: []};
        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);
        this.add = this.add.bind(this);
    }

    search() {
        const query = this.query.value;
        const url = `http://www.omdbapi.com/?s=${query}&page=1`;
         axios.get(url)
        .then((response) => {
            const results = response.data.Search;
            this.setState({results});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    clear() {
        this.setState({results: []});
    }

    add(event) {

        const id = event.target.parentNode.parentNode.querySelector('.id').textContent;
        const title = event.target.parentNode.parentNode.querySelector('.title').textContent;
        const year = event.target.parentNode.parentNode.querySelector('.year').textContent;
        const type = event.target.parentNode.parentNode.querySelector('.type').textContent;
        const poster = event.target.parentNode.parentNode.querySelector('.poster').getAttribute('src');

        this.db.put({
            _id: id,
            title,
            year,
            type,
            poster
            }).then((response) => {
                console.log(response);
            }).catch((err) => {
            console.log(err);
        });
    }

    // It's get called automatically
    componentDidMount() {
        this.db.allDocs({
            include_docs: true,
            attachments: true
            }).then(function (result) {
                const movies = result.rows;
                this.setState({movies});
                console.log(result);
            }).catch(function (err) {
                console.log(err);
        });
    }

    render() {
    return (
    <div>
        <h1>Movies</h1>
        <div className="panel panel-default">
            <div className="panel-body">
            <label>Search</label>
            <input ref={n => this.query = n} type="text" />
            <button onClick={this.search} className="btn btn-primary btn-sm">Search</button>
            <button onClick={this.clear} className="btn btn-reset btn-sm">Clear</button>
            </div>
        </div>
        <div className="panel panel-default">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Add</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Type</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.results.map((elem, index) => {
                        return (
                            <tr key={index}>
                                <td><button onClick={this.add} className="btn btn-success btn-xs">Add</button></td>
                                <td className="id" hidden="true"> {elem.imdbID} </td>
                                <td className="title"> {elem.Title} </td>
                                <td className="year"> {elem.Year} </td>
                                <td className="type"> {elem.Type} </td>
                                <td> <img className="poster" src={elem.Poster} /> </td>
                            </tr>
                        )
                    } )
                }
                </tbody>
            </table>
                        <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Type</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.movies.map((elem, index) => {
                        return (
                            <tr key={index}>
                                <td> {elem.doc.title} </td>
                                <td> {elem.doc.year} </td>
                                <td> {elem.doc.type} </td>
                                <td> <img src={elem.Poster} /> </td>
                            </tr>
                        )
                    } )
                }
                </tbody>
            </table>
        </div>
        </div>
    );
    }
}