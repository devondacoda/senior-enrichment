import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campuses: []
    };
  }

  componentDidMount() {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => this.setState({campuses}));
  }

  render() {
    const campuses = this.state.campuses;
    return (
      <div id="campuses">
        {
          campuses.map(campus => {
            return (
              <div className="campus" key={campus.id}>
                <Link to={`/campuses/${campus.id}`} className="campus-name">
                  <h2> {campus.name} </h2>
                  <img src={campus.image} />
                </Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}
