import React, { Component } from 'react';
import { range } from 'lodash';

class Routine extends Component {
  render() {
    const days = 3;
    const grades = ['6', '9', '10'];
    return (
      <div className="rountine">
        <div className="header">
          <div className="container">
            <div>Day</div>
            {grades.map((grade) => <div>{grade}</div>)}
          </div>
        </div>

        <div className="container">
          {range(1, days + 1).map((day) => (
            <div className="day">
              <p>Day: {day}</p>
              {grades.map((grade) => (
                <p>Gr. {grade}, Day: {day}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Routine;
