/* eslint meteor/no-session: 0 */

import moment from 'moment';
import { DropTarget } from 'react-dnd';
import React, { Component } from 'react';

import Modal from './Modal.js';
import SessionCard from './SessionCard.js';
import SessionEditor from './SessionEditor.js';
import { updateDay } from '../../api/models/sessions.js';


class SessionsList extends Component {
  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
  }

  openModal({ target }) {
    return this._modal.open(target.parentNode.getBoundingClientRect());
  }

  render() {
    const { subjects, day, grade, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="sessions-list">
        <button onClick={this.openModal}>Edit</button>

        <Modal ref={(c) => (this._modal = c)}>
          <div>
            <p>Day: {day + 1}, Grade: {grade}</p>
            <ul>
              {subjects.map(data => (
                <SessionEditor {...data} key={data._id} />
              ))}
            </ul>
          </div>
        </Modal>

        {subjects.map((data) => (
          <SessionCard {...data} key={data._id} />
        ))}
      </div>
    );
  }
}

SessionsList.propTypes = {
  subjects: React.PropTypes.array.isRequired,
  day: React.PropTypes.number,
  grade: React.PropTypes.number,
  examStartTime: React.PropTypes.string.isRequired,
  connectDropTarget: React.PropTypes.func,
};

export default DropTarget('SESSION', {
  drop(props, monitor) {
    const { _id } = monitor.getItem();
    const { day, subjects, examStartTime } = props;

    const lastSubject = subjects[subjects.length - 1];
    const startTime = lastSubject ? moment(
      lastSubject.endTime, 'HH:mm'
    ).add(0.5, 'h').format('HH:mm') : examStartTime;

    updateDay.call({ _id, day, startTime });
    return {};
  },

  canDrop(props, monitor) {
    return props.grade === monitor.getItem().grade;
  },
}, (connect) => ({ connectDropTarget: connect.dropTarget() }))(SessionsList);
