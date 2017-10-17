import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default function Navbar () {
  return (
    <div>
      <div className="navbar">
        <div id="navbar-links">
          <Link to="/" className="navbar-item">
            <h4>Home</h4>
          </Link>
          <Link to="/students" className="navbar-item">
            <h4>Students</h4>
          </Link>
          <Link to="/create/campus" className="navbar-item">
          <h4>Create Campus</h4>
          </Link>
          <Link to="/create/student" className="navbar-item">
          <h4>Create Student</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
