/* eslint meteor/no-session: 0 */

import moment from 'moment';
import { DropTarget } from 'react-dnd';
import React, { Component } from 'react';

import SessionCard from './SessionCard.js';
import { updateDay } from '../../api/models/sessions.js';


class SessionsList extends Component {
  render() {
    const { subjects, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="sessions-list">
        <button>Open Modal</button>
        <div className="Modal"></div>
        {subjects.map((data) => (
          <SessionCard
            {...data}
            key={data._id}
          />
        ))}
      </div>
    );
  }
}

SessionsList.propTypes = {
  subjects: React.PropTypes.array.isRequired,
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
