/* eslint meteor/no-session: 0 */

import React from 'react';
import moment from 'moment';
import { DragSource, DropTarget } from 'react-dnd';

import { updateDay } from '../../api/models/sessions.js';


const Session = ({ name, examtime, room, startTime, endTime, connectDragSource }) => (
  connectDragSource(
    <div className="session">
      <hr style={{ width: `${examtime * 10}%` }} />
      <p>{name}</p>
      <p>{startTime} - {endTime}</p>
      {room.length ? <p>Rooms: {room.join(', ')}</p> : null}
    </div>
  )
);

Session.propTypes = {
  name: React.PropTypes.string.isRequired,
  examtime: React.PropTypes.number.isRequired,
  room: React.PropTypes.array.isRequired,
  startTime: React.PropTypes.string.isRequired,
  endTime: React.PropTypes.string.isRequired,
};

const DragSession = DragSource('SESSION', {
  beginDrag({ sessionId, grade }) {
    return { _id: sessionId, grade };
  },
}, (connect) => ({ connectDragSource: connect.dragSource() }))(Session);


const SessionsList = ({ subjects, startTime, connectDropTarget }) => {
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
      {subjects.map((data) => (
        <DragSession
          {...data}
          key={data._id}
          startTime={time}
          endTime={updateTime(data.examtime)}
        />
      ))}
    </div>
  );
};

SessionsList.propTypes = {
  subjects: React.PropTypes.array.isRequired,
  startTime: React.PropTypes.string.isRequired,
};

const DragSessionsList = DropTarget('SESSION', {
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

export default DragSessionsList;
