import React from 'react';
import { range } from 'lodash';

import { Exams } from '../../api/models/exams.js';
import { createContainer } from 'meteor/react-meteor-data';


const Routine = ({ days = 0, grades = [] }) => (
  <div className="rountine">
    <div className="header">
      <div className="container">
        <div>Day</div>
        {grades.map((grade) => <div key={`h-${grade}`}>{grade}</div>)}
      </div>
    </div>

    <div className="container">
      {range(1, days + 1).map((day) => (
        <div key={`${day}`} className="day">
          <p>Day: {day}</p>
          {grades.map((grade) => (
            <p key={`${day}--${grade}`}>Gr. {grade}, Day: {day}</p>
          ))}
        </div>
      ))}
    </div>
  </div>
);

Routine.propTypes = {
  days: React.PropTypes.number,
  grades: React.PropTypes.array,
};

export default createContainer(() => Exams.findOne({}) || {}, Routine);
