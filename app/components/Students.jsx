import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Students extends Component {
  constructor() {
    super();

    this.state = {
      students: []
    };
  }

  componentDidMount() {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => this.setState({students}));
  }

  render() {
    const students = this.state.students;
    return (
      <div>
        {
          students.map(student => {
            return (
              <div key={student.id}>
                <Link to={`/students/${student.id}`}>
                  <h3>{student.name}</h3>
                </Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}
