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

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;
    axios.get(`api/students/${studentId}`)
    .then(res => res.data)
    .then(studentNestedObj => {
      const {id, name, email, campus} = studentNestedObj;
      this.setState({student: {id, name, email, campus}});
    });
  }

  render() {
    const student = this.state.student;

    return (
      <div>
         <div className="modifier-btns">
          <Link to={`/students/edit/${student.id}`}>
            <button className="modifier-btn">Edit Student</button>
          </Link>
          <Link to="/students">
            <button
            className="modifier-btn"
            onClick={this.handleDelete}>Delete Student</button>
          </Link>
        </div>
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

  handleDelete() {
    const studentId = this.props.match.params.studentId;
    axios.delete(`/api/students/${studentId}`);
  }
}
