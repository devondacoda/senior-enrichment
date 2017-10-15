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
    return (
      <div>
        <h2>{student.name.toUpperCase()}</h2>
        {student.email ? <h2>Email: {student.email}</h2> : <div />}
        <div>
          <h2> {student.campus.name} </h2>
          <img src={student.campus.image} />
        </div>
      </div>
    );
  }
}
