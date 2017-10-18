import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class SingleCampus extends Component {
  constructor() {
    super();

    this.state = {
      campus: {},
      students: []
    };
  }

  componentDidMount() {
    const campusId = this.props.match.params.campusId;
    axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data)
    .then(campusStudentArr => {
      const campus = campusStudentArr[0];
      const students = campusStudentArr[1];

      this.setState({campus, students});
    });
  }

  render() {
    const students = this.state.students;
    return (
      <div>
        <div className="modifier-btns">
          <Link className="modifier-btn" to="">Edit Campus</Link>
          <Link className="modifier-btn" to="">Delete Campus</Link>
        </div>
        <h1>Campus: {this.state.campus.name}</h1>
        <h2> Students </h2>
        {students.length ?
          <ol>
            {students.map(student => {
              return (
                <div key={student.id}>
                  <Link to={`/students/${student.id}`}>
                    <li>{student.name}</li>
                  </Link>
                </div>
              );
            })}
          </ol> :
            <h3> No students. </h3>
          }
      </div>
    );
  }
}
