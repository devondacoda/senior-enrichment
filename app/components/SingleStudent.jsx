import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class SingleStudent extends Component {
  constructor() {
    super();

    this.state = {
      student: {
        name: '',
        email: '',
        campus: {}
      }
    };
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;
    axios.get(`api/students/${studentId}`)
    .then(res => res.data)
    .then(studentNestedObj => {
      const name = studentNestedObj.name;
      const email = studentNestedObj.email;
      const campus = studentNestedObj.campus;

      this.setState({student: {name, email, campus}});
    });
  }

  render() {
    const student = this.state.student;
    console.log(student);
    return (
      <div>
        <h2>{student.name.toUpperCase()}</h2>
        <h2>Email: {student.email}</h2>
        {
          student.campus ?
          <Link to={`/campuses/${student.campus.id}`}>
            <div>
              <h2> College: {student.campus.name}</h2>
              <img src={student.campus.image} />
            </div>
          </Link> :
          <h3>No college selected</h3>
        }
      </div>
    );
  }
}
