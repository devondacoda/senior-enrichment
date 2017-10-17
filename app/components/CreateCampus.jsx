import React, {Component} from 'react';
import axios from 'axios';

export default class CreateCampus extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form id="new-campus-form" onSubmit={this.handleSubmit}>
        <input
        name="name"
        className="input"
        type="text" placeholder="Enter Campus Name"
        required />
        <input
        name="image"
        className="input"
        type="text"
        placeholder="Enter Image Link (optional)" />
        <button className="btn">SAVE</button>
      </form>
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const image = evt.target.image.value;
    const reqBody = image ? {name, image} : {name};
    
    axios.post('/api/campuses', reqBody)
    .then(res => res.data)
    .then(campus => {
      this.props.history.push(`/campuses/${campus.id}`);
    });
  }
}
