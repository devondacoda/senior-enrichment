import React, {Component} from 'react';
import axios from 'axios';

export default class ModifyCampus extends Component {
  constructor() {
    super();

    this.state = {
      students: [],
      studentNames: [],
      selectedStudent: '',
      selectedStudents: []
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => this.setState({students, studentNames: students.map(student => student.name)}));
  }

  render() {
    return (
      <div>
        <p>*Leave field blank if no change*</p>
        <form onSubmit={this.handleSubmit}>
          <div id="campus-info-input">
            <label>Name</label>
            <br />
            <input name="name" type="text" placeholder="Campus Name" />
            <hr />
            <label>Image</label>
            <br />
            <input name="image" type="text" placeholder="Campus Image (URL)" />
          </div>

          <hr />
          <label>Select Students</label>
          <br /> <br />
          <div id="student-select">
            <select name="students" onChange={this.handleSelect}>
              <option />
              {
                this.state.studentNames.map(student => <option key={student}>{student}</option>)
              }
            </select>

            <button id="add-student-btn" onClick={this.handleAdd}>ADD</button>
            <div id="selected-students">
              <header>Selected Students:</header>
              <ul>{this.state.selectedStudents.map(student => <li key={student}> {student} </li>) }</ul>
            </div>
          </div>

          <br />
          <button id="edit-campus-save">SAVE</button>
        </form>
      </div>
    );
  }

  handleSelect(evt) {
    this.setState({selectedStudent: evt.target.value});
  }

  handleAdd(evt) {
    evt.preventDefault();
    const {selectedStudent, studentNames} = this.state;

    studentNames.splice(studentNames.indexOf(selectedStudent), 1);
    this.setState({selectedStudents: [...this.state.selectedStudents, selectedStudent]});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const campusId = this.props.match.params.campusId;
    const {name, image} = evt.target;
    const reqBody = {name: name.value, image: image.value, campusId, students: this.state.selectedStudents};

    axios.put(`/api/campuses/${campusId}`, reqBody)
    .then(res => res.data)
    .then(() => {
      this.props.history.push(`/campuses/${campusId}`);
    });
  }
}
