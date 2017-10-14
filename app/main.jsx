'use strict';
import './index.css';
import React from 'react';
import {render} from 'react-dom';
import {Route, HashRouter as Router} from 'react-router-dom';
// import { Provider } from 'react-redux'

// import store from './store'
// import Root from './components/Root'
import Navbar from './components/Navbar';
import Campuses from './components/Campuses';
import Students from './components/Students';

render(
  <Router>
    <div>
      <Navbar />
      <div>
        <Route exact path="/" component={Campuses} />
        <Route exact path="/students" component={Students} />
      </div>
    </div>
  </Router>,
  document.getElementById('main')
);
