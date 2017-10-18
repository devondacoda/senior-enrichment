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
import SingleCampus from './components/SingleCampus';
import Students from './components/Students';
import SingleStudent from './components/SingleStudent';
import CreateCampus from './components/CreateCampus';
import CreateStudent from './components/CreateStudent';
import ModifyStudent from './components/ModifyStudent';
import ModifyCampus from './components/ModifyCampus';

render(
  <Router>
    <div>
      <Navbar />
      <div id="content">
        <Route exact path="/" component={Campuses} />
        <Route exact path="/students" component={Students} />
        <Route exact path="/students/:studentId" component={SingleStudent} />
        <Route exact path="/campuses/:campusId" component={SingleCampus} />
        <Route path="/create/campus" component={CreateCampus} />
        <Route path="/create/student" component={CreateStudent} />
        <Route path="/students/edit/:studentId" component={ModifyStudent} />
        <Route path="/campuses/edit/:campusId" component={ModifyCampus} />
      </div>
    </div>
  </Router>,
  document.getElementById('main')
);
