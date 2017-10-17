import React, {Component} from 'react';
import axios from 'axios';

export default class CreateCampus extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form id="new-student-form" onSubmit={this.handleSubmit}>
        <input
        name="name"
        className="input"
        type="text" placeholder="Enter Student Name"
        required />
        <input
        name="email"
        className="input"
        type="email"
        placeholder="Enter Email"
        required />
        <button className="btn">SAVE</button>
      </form>
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const email = evt.target.email.value;
    const reqBody = {name, email};

    axios.post('/api/students', reqBody)
    .then(res => res.data)
    .then(student => {
      this.props.history.push(`/students/${student.id}`);
    });
  }
}
