import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends Component {
  constructor() {
    super();

    this.state = {
      campuses: []
    };
  }

  componentDidMount() {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => this.setState({campuses})); // FINISH THIS REQUEST
  }

  render() {
    const campuses = this.state.campuses;
    return (
      <div>
        {
          campuses.map(campus => {
            return (
              <div key={campus.id}>
                <Link to="#">
                  <h2> {campus.name} </h2>
                </Link>
                <img src={campus.image} />
              </div>
            );
          })
        }
      </div>
    );
  }
}
