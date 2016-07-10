import React, { Component } from 'react';
import { isEqual } from 'lodash';


/* eslint no-param-reassign: 0 */
/* eslint no-return-assign: 0 */

class TeacherTiming extends Component {
  constructor({ data }) {
    super();

    this.state = Object.assign({
      sun: ['', ''],
      mon: ['', ''],
      tue: ['', ''],
      wed: ['', ''],
      thu: ['', ''],
    }, data);
  }

  componentDidMount() {
    this._table.querySelectorAll('input')
      .forEach((i) => {
        i.oninvalid = (e) => e.target.setCustomValidity('dd');
        return true;
      });
    // TODO: Add validation message.
    return true;
  }

  handleChange(value, day, position) {
    const stateSlice = this.state[day];
    stateSlice[position] = value;
    return this.setState({ [day]: stateSlice }, () => {
      const state = Object.assign({}, this.state);

      Object.keys(state).forEach(item => {
        if (isEqual(state[item], ['', ''])) {
          delete state[item];
        }
      });

      return this.props.onChange(state);
    });
  }

  render() {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu'];

    return (
      <table ref={(el) => this._table = el}>
        <thead>
          <tr>
            <th>Time Block</th>
            {days.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Start</td>
            {days.map((day, i) => (
              <th key={`s-${day}`}>
                <input
                  type="text"
                  pattern="(\d){2}:(\d){2}"
                  value={this.state[day][0]}
                  tabIndex={(2 * i) + 1}
                  onChange={(e) => this.handleChange(e.target.value, day, 0)}
                />
              </th>)
            )}
          </tr>

          <tr>
            <td>End</td>
            {days.map((day, i) => (
              <th key={`e-${day}`}>
                <input
                  type="text"
                  pattern="(\d){2}:(\d){2}"
                  value={this.state[day][1]}
                  tabIndex={(2 * i) + 2}
                  onChange={(e) => this.handleChange(e.target.value, day, 1)}
                />
              </th>)
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}

TeacherTiming.propTypes = {
  data: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

export default TeacherTiming;
