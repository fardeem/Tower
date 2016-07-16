import { isEqual } from 'lodash';
import React, { Component } from 'react';

import { updateRoom } from '../../api/models/sessions.js';


class SessionEditor extends Component {
  constructor({ room }) {
    super();

    this.state = { room: room.join(', '), shouldUpdate: false };
    this.formatRoom = this.formatRoom.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  formatRoom(value) {
    return value.split(',')
      .map(val => val.trim())
      .filter(val => !!val);
  }

  handleChange(value) {
    return this.setState({
      room: value,
      shouldUpdate: ! isEqual(this.props.room, this.formatRoom(value)),
    });
  }

  submitForm(e) {
    e.preventDefault();

    return updateRoom.call({
      _id: this.props.sessionId,
      value: this.formatRoom(this.state.room),
    }, () => this.setState({ shouldUpdate: false }));
  }

  render() {
    const { name, startTime, endTime } = this.props;
    const { shouldUpdate } = this.state;

    return (
      <li>
        <div>{startTime} - {endTime}</div>
        <h2>{name}</h2>

        <form onSubmit={this.submitForm}>
          <label>
            <span>Room</span>
            <input
              type="text"
              value={this.state.room}
              onChange={({ target }) => this.handleChange(target.value)}
            />
          </label>

          {shouldUpdate ? <input type="submit" value="update" /> : false}
        </form>

      </li>
    );
  }
}

SessionEditor.propTypes = {
  name: React.PropTypes.string.isRequired,
  room: React.PropTypes.array.isRequired,
  startTime: React.PropTypes.string.isRequired,
  endTime: React.PropTypes.string.isRequired,
  sessionId: React.PropTypes.string.isRequired,
};

export default SessionEditor;
