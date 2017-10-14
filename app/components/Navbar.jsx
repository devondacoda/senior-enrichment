import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/students" className="navbar-item">Students</Link>
        </div>
      </div>
    );
  }
}
