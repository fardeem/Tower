import React, { Component } from 'react';


/* eslint no-param-reassign: 0 */
/* eslint no-return-assign: 0 */

class Timing extends Component {
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
    this.setState({ [day]: stateSlice });
    return this.props.onChange(this.state);
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
            {days.map(day => (
              <th key={`s-${day}`}>
                <input
                  type="text"
                  pattern="(\d){2}:(\d){2}"
                  value={this.state[day][0]}
                  onChange={(e) => this.handleChange(e.target.value, day, 0)}
                />
              </th>)
            )}
          </tr>

          <tr>
            <td>End</td>
            {days.map(day => (
              <th key={`e-${day}`}>
                <input
                  type="text"
                  pattern="/(\d){2}:(\d){2}/"
                  value={this.state[day][1]}
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

Timing.propTypes = {
  data: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

export default Timing;
