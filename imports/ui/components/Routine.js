import React from 'react';
import moment from 'moment';
import { range } from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';

import { Exams } from '../../api/models/exams.js';
import SessionsList from '../containers/SessionsListContainer.js';


function formatDate(date = new Date(), dayIndex) {
  let instance = moment(date).add(dayIndex, 'd');

  if (instance.format('d') === '5') {
    // skip friday
    instance = instance.add(2, 'd');
  } else if (instance.format('d') === '6') {
    // Skip saturday
    instance = instance.add(1, 'd');
  }

  return {
    day: instance.format('dddd'),
    date: instance.format('Do MMM \'YY'),
  };
}


const Routine = ({ days = 0, grades, date, time }) => (
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
            <SessionsList
              day={day}
              grade={grade}
              starttime={time}
              key={`${day}/${grade}`}
            />
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
