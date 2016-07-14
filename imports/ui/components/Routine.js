import React from 'react';
import moment from 'moment';
import { range } from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { incrementDay } from '../../api/models/exams.js';
import SessionsList from '../containers/SessionsListContainer.js';


function formatDate(date, daysToAdd) {
  let i = 0;
  const instance = moment(date);

  while (i < daysToAdd) {
    instance.add(1, 'd');
    if (instance.day() !== 5 && instance.day() !== 6) {
      i++;
    }
  }

  return {
    day: instance.format('dddd'),
    date: instance.format('Do MMM \'YY'),
  };
}


class Routine extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    incrementDay.call({ _id: this.props._id });
  }

  render() {
    const { days = 0, grades = [], date, time } = this.props;

    return (
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
                  startTime={time}
                  key={`${day}/${grade}`}
                />
              ))}
            </div>
          ))}
        </div>

        <button onClick={this.handleClick}>Add day</button>
      </div>
    );
  }
}

Routine.propTypes = {
  _id: React.PropTypes.string,
  date: React.PropTypes.object,
  time: React.PropTypes.string,
  days: React.PropTypes.number,
  grades: React.PropTypes.array,
};

export default DragDropContext(HTML5Backend)(Routine);
