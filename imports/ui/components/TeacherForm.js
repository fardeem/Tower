import React, { Component } from 'react';

import { add, update } from '../../api/models/teachers.js';
import SubjectPicker from './SubjectPicker.js';
import TeacherTiming from './TeacherTiming.js';


class TeacherForm extends Component {
  constructor({ data }) {
    super();

    this.isUpdatingForm = !! data;
    this.state = Object.assign({
      name: '', subjects: [], parttime: false, timing: {},
    }, data, { shouldUpdate: false });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value, field) {
    this.setState({ shouldUpdate: true, [field]: value });
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const { name, grade, examtime } = this.state;

  //   if (this.isUpdatingForm) {
  //     return update.call({
  //       _id: this.props.data._id,
  //       transaction: { name, grade, examtime },
  //     }, () => this.setState({ shouldUpdate: false }));
  //   }

  //   return add.call({ name, grade, examtime }, () => this.setState({
  //     shouldUpdate: false, name: '', grade: '', examtime: '',
  //   }));
  // }

  handleSubmit(e) {
    e.preventDefault();
    const { name, subjects, parttime, timing } = this.state;

    if (this.isUpdatingForm) {
      return update.call({
        _id: this.props.data._id,
        transaction: { name, subjects, parttime, timing },
      }, () => this.setState({ shouldUpdate: false }));
    }

    return add.call({ name, subjects, parttime, timing }, () => this.setState({
      name: '', subjects: [], parttime: false, timing: {},
    }));
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

        {this.isUpdatingForm ?
          <ul>
            {state.shouldUpdate ? <li><input type="submit" value="update" /></li> : null}
            <li><button onClick={this.removeSubject}>Delete</button></li>
          </ul> :
          <input type="submit" value="create" />}
      </form>
    );
  }
}

TeacherForm.propTypes = {
  data: React.PropTypes.object,
};

export default TeacherForm;
