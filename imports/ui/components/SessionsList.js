/* eslint meteor/no-session: 0 */

import moment from 'moment';
import { DropTarget } from 'react-dnd';
import React, { Component } from 'react';

import SessionCard from './SessionCard.js';
import { updateDay } from '../../api/models/sessions.js';


class SessionsList extends Component {
  constructor() {
    super();
  }

  render() {
    const { subjects, startTime, connectDropTarget } = this.props;
    let time = startTime;

    function updateTime(interval) {
      const endtime = moment(time, 'hh:mm')
        .add(interval, 'h')
        .format('hh:mm');

      time = moment(endtime, 'hh:mm').add(0.5, 'h').format('hh:mm');
      return endtime;
    }

    return connectDropTarget(
      <div className="sessions-list">
        <button>Open Modal</button>
        <div className="Modal"></div>
        {subjects.map((data) => (
          <SessionCard
            {...data}
            key={data._id}
            startTime={time}
            endTime={updateTime(data.examtime)}
          />
        ))}
      </div>
    );
  }
}

SessionsList.propTypes = {
  subjects: React.PropTypes.array.isRequired,
  startTime: React.PropTypes.string.isRequired,
  connectDropTarget: React.PropTypes.func,
};

export default DropTarget('SESSION', {
  drop(props, monitor) {
    const { _id } = monitor.getItem();
    const { day } = props;
    updateDay.call({ _id, day });
    return {};
  },

  canDrop(props, monitor) {
    return props.grade === monitor.getItem().grade;
  },
}, (connect) => ({ connectDropTarget: connect.dropTarget() }))(SessionsList);
