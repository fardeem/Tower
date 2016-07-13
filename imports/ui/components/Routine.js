import React from 'react';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';
import { range } from 'lodash';

import { Exams } from '../../api/models/exams.js';


function formatDate(date = new Date(), dayIndex) {
  let instance = moment(date).add(dayIndex, 'd');

  if (instance.format('d') === '5') {
    instance = instance.add(2, 'd');
  } else if (instance.format('d') === '6') {
    instance = instance.add(1, 'd');
  }

  return {
    day: instance.format('dddd'),
    date: instance.format('Do MMM \'YY'),
  };
}

// ===========================================

import { Sessions } from '../../api/models/sessions.js';
import { Subjects } from '../../api/models/subjects.js';

const SessionCard = ({ name, examtime, starttime, endtime, room }) => {
  return (
    <div className="session">
      <hr style={{ width: `${examtime * 10}%` }} />
      <p>{name}</p>
      <p>{starttime} - {endtime}</p>
      {room.length ? <p>Rooms: {room.join(', ')}</p> : null}
    </div>
  );
};

const SessionList = ({ subjects, starttime }) => {
  let time = starttime;

  function updateTime(examtime) {
    const endtime = moment(time, 'hh:mm')
      .add(examtime, 'h')
      .format('hh:mm');

    time = moment(endtime, 'hh:mm').add(0.5, 'h').format('hh:mm');
    return endtime;
  }

  return (
    <div className="sessions-list">
      {subjects.map((data) => (
        <SessionCard
          {...data}
          key={data._id}
          starttime={time}
          endtime={updateTime(data.examtime)}
        />
      ))}
    </div>
  );
};


const SessionListContainer = createContainer(({ day, grade, starttime }) => {
  const subjects = Sessions.find({ day })
    .map(({ subjectId, room }) => (
      Object.assign({}, Subjects.findOne({ _id: subjectId, grade }), { room })
    ));

  return {
    subjects,
    starttime,
  };
}, SessionList);

// =============================================

const Routine = ({ days = 0, grades = [], date, time }) => (
  <div className="rountine">
    <div className="header">
      <div className="container">
        <div>Day</div>
        {grades.map((grade) => <div key={`h-${grade}`}>{grade}</div>)}
      </div>
    </div>

    <div className="container">
      {range(0, days).map((day) => (
        <div key={`${day}`} className="day">
          <time>
            <p>{day + 1}</p>
            {formatDate(date, day).day}
            <br />
            {formatDate(date, day).date}
          </time>
          {grades.map((grade) => (
            <SessionListContainer key={`${day}/${grade}`} grade={grade} day={day} starttime={time} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

Routine.propTypes = {
  date: React.PropTypes.object,
  time: React.PropTypes.string,
  days: React.PropTypes.number,
  grades: React.PropTypes.array,
};


export default createContainer(() => Exams.findOne({}) || {}, Routine);
