import React, { Component } from 'react';

import { add } from '../../api/models/teachers.js';
import SubjectPicker from './SubjectPicker.js';
import TeacherTiming from './TeacherTiming.js';


class TeacherForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      subjects: [],
      parttime: false,
      timing: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value, field) {
    this.setState({ [field]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    add.call(this.state, () => (
      this.setState({ name: '', subjects: [], parttime: false, timing: {} })
    ));
  }

  render() {
    const state = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <span>Name</span>
          <input
            type="text"
            value={state.name}
            onChange={({ target }) => this.handleChange(target.value, 'name')}
          />
        </label>

        <label>
          <span>Subjects</span>
          <SubjectPicker
            value={state.subjects}
            onChange={(v) => this.handleChange(v, 'subjects')}
          />
        </label>

        <label>
          <span>Parttime</span>
          <label>
            <span>{state.parttime ? 'Yes' : 'No'}</span>
            <input
              type="checkbox"
              checked={state.parttime}
              onChange={({ target }) => this.handleChange(target.checked, 'parttime')}
            />
          </label>
        </label>

        {state.parttime ?
          <TeacherTiming
            data={state.timing}
            onChange={(v) => this.handleChange(v, 'timing')}
          /> : null}

        <input type="submit" />
      </form>
    );
  }
}

export default TeacherForm;
