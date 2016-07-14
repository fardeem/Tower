/* eslint meteor/no-session: 0 */

import React from 'react';
import moment from 'moment';


const Session = ({ name, examtime, room, startTime, endTime }) => (
  <div className="session">
    <hr style={{ width: `${examtime * 10}%` }} />
    <p>{name}</p>
    <p>{startTime} - {endTime}</p>
    {room.length ? <p>Rooms: {room.join(', ')}</p> : null}
  </div>
);

Session.propTypes = {
  name: React.PropTypes.string,
  examtime: React.PropTypes.number,
  room: React.PropTypes.array,
  startTime: React.PropTypes.string,
  endTime: React.PropTypes.string,
};


const SessionsList = ({ subjects, startTime }) => {
  let time = startTime;

  function updateTime(interval) {
    const endtime = moment(time, 'hh:mm')
      .add(interval, 'h')
      .format('hh:mm');

    time = moment(endtime, 'hh:mm').add(0.5, 'h').format('hh:mm');
    return endtime;
  }

  return (
    <div className="sessions-list">
      {subjects.map((data) => (
        <Session
          {...data}
          key={data._id}
          startTime={time}
          endtime={updateTime(data.examtime)}
        />
      ))}
    </div>
  );
};

SessionsList.propTypes = {
  subjects: React.PropTypes.array,
  startTime: React.PropTypes.string,
};

export default SessionsList;
