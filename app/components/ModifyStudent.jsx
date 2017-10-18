import React, {Component} from 'react';
import axios from 'axios';

export default class ModifyStudent extends Component {
  constructor() {
    super();

    this.state = {
      campuses: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => this.setState({campuses}));
  }

  render() {
    return (
      <div>
        <p>*Leave field blank if no change*</p>
        <form onSubmit={this.handleSubmit}>
          <div id="student-info-input">
            <label>Name</label>
            <br />
            <input name="name" type="text" placeholder="Student Name" />
            <hr />
            <label>Email</label>
            <br />
            <input name="email" type="text" placeholder="Student Email" />
          </div>

          <hr />
          <label>Select Campus</label>
          <br />
          <select name="campus">
            <option />
            {
              this.state.campuses.map(campus => <option key={campus.id}>{campus.name}</option>)
            }
          </select>
          <br />
          <button id="edit-student-save">SAVE</button>
        </form>
      </div>
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const studentId = this.props.match.params.studentId;
    const {name, email, campus} = evt.target;
    const reqBody = {name: name.value, email: email.value, campus: campus.value};

    axios.put(`/api/students/${studentId}`, reqBody)
    .then(res => res.data)
    .then(() => {
      this.props.history.push(`/students/${studentId}`);
    });
  }
}
