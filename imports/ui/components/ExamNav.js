import React from 'react';
import { Link } from 'react-router';


const ExamNav = ({ id }) => (
  <nav>
    <Link to={`/exams/${id}`}>Routine</Link>
    <Link to={`/exams/${id}/rooms`}>Rooms</Link>
  </nav>
);

ExamNav.propTypes = {
  id: React.PropTypes.string,
};

export default ExamNav;
