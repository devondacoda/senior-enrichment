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

    this.handleCampusDelete = this.handleCampusDelete.bind(this);
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
          <Link className="modifier-btn" to={`/campuses/edit/${this.state.campus.id}`}>
            <button>
              Edit Campus
            </button>
          </Link>
          <Link className="modifier-btn" to="/">
            <button onClick={this.handleCampusDelete}>
              Delete Campus
            </button>
          </Link>
        </div>
        <h1>Campus: {this.state.campus.name}</h1>
        <h2> Students </h2>
        {students.length ?
          <ol>
            {students.map((student, idx) => {
              return (
                <div id="campus-stdnts" key={student.id}>
                  <Link to={`/students/${student.id}`}>
                    <li key={idx}>{student.name}</li>
                  </Link>
                  <button
                  id="stdnt-delete"
                  onClick={this.handleStudentDelete.bind(this, idx, student.id)}> X </button>
                </div>
              );
            })}
          </ol> :
            <h3> No students. </h3>
          }
      </div>
    );
  }

  handleCampusDelete() {
    const campusId = this.props.match.params.campusId;
    axios.delete(`/api/campuses/${campusId}`);
  }

  handleStudentDelete(idx, studentId) {
    axios.put(`/api/students/removeCampus/${studentId}`, {name: '', email: '', campus: ''})
    .then(() => {
      this.setState({
        students: this.state.students.filter((student, i) => {
          return i !== idx;
        })
      });
    });
  }
}
