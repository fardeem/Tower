import React, { Component } from 'react';

import { add } from '../../api/models/subjects.js';


class SubjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', grade: '', examtime: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ name: '', grade: '', examtime: '' });
    return add.call(this.state);
  }

  handleChange({ target }, field) {
    return this.setState({
      [field]: Number(target.value) ? Number(target.value) : target.value,
    });
  }

  render() {
    const state = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <span>Name</span>
          <input
            type="text"
            required
            value={state.name}
            onChange={(e) => this.handleChange(e, 'name')}
          />
        </label>

        <label>
          <span>Grade</span>
          <input
            type="number"
            required
            min={5}
            max={12}
            value={state.grade}
            onChange={(e) => this.handleChange(e, 'grade')}
          />
        </label>

        <label>
          <span>Exam Time</span>
          <input
            type="number"
            required
            value={state.examtime}
            onChange={(e) => this.handleChange(e, 'examtime')}
          />
        </label>

        <input type="submit" value="create" />
      </form>
    );
  }
}

export default SubjectForm;

/* DUMPING */
/*class SubjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      grade: props.grade,
    }
  }

  handleSubmit() {
    console.log(this.state);
  }

  handleChange({ target }, field) {
    return this.setState({ [field]: target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} />
        <input
          type="number"
          value={this.state.grade}
          onChange={(e) => this.handleChange(e, 'grade')}
        />
        <input type="submit" />
      </form>
    );
  }
}*/
