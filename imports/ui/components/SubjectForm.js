import React, { Component } from 'react';

import { add, update, remove } from '../../api/models/subjects.js';


class SubjectForm extends Component {
  constructor({ data }) {
    super();

    this.isUpdatingForm = !! data;
    this.state = Object.assign({
      name: '', grade: '', examtime: '',
    }, data, { shouldUpdate: false });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeSubject = this.removeSubject.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, grade, examtime } = this.state;

    if (this.isUpdatingForm) {
      return update.call({
        _id: this.props.data._id,
        transaction: { name, grade, examtime },
      }, () => this.setState({ shouldUpdate: false }));
    }

    return add.call({ name, grade, examtime }, () => this.setState({
      name: '', grade: '', examtime: '',
    }));
  }

  handleChange(value, field) {
    return this.setState({ shouldUpdate: true, [field]: value });
  }

  removeSubject() {
    return remove.call(this.props.data._id);
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
            onChange={({ target }) => this.handleChange(target.value, 'name')}
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
            onChange={({ target }) => this.handleChange(Number(target.value), 'grade')}
          />
        </label>

        <label>
          <span>Exam Time</span>
          <input
            type="number"
            required
            value={state.examtime}
            onChange={({ target }) => this.handleChange(Number(target.value), 'examtime')}
          />
        </label>

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

SubjectForm.propTypes = {
  data: React.PropTypes.object,
};

export default SubjectForm;
