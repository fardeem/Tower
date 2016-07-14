import React from 'react';
import { DragSource } from 'react-dnd';


const SessionCard = ({ name, examtime, room, startTime, endTime, connectDragSource }) => (
  connectDragSource(
    <div className="session">
      <hr style={{ width: `${examtime * 10}%` }} />
      <p>{name}</p>
      <p>{startTime} - {endTime}</p>
      {room.length ? <p>Rooms: {room.join(', ')}</p> : null}
    </div>
  )
);

SessionCard.propTypes = {
  name: React.PropTypes.string.isRequired,
  examtime: React.PropTypes.number.isRequired,
  room: React.PropTypes.array.isRequired,
  startTime: React.PropTypes.string.isRequired,
  endTime: React.PropTypes.string.isRequired,
};

export default DragSource('SESSION', {
  beginDrag({ sessionId, grade }) {
    return { _id: sessionId, grade };
  },
}, (connect) => ({ connectDragSource: connect.dragSource() }))(SessionCard);
