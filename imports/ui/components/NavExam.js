import React from 'react';
import { Link } from 'react-router';


const NavExam = ({ id }) => (
  <nav>
    <Link to={`/exams/${id}`}>Routine</Link>
    <Link to={`/exams/${id}/rooms`}>Rooms</Link>
  </nav>
);

NavExam.propTypes = {
  id: React.PropTypes.string,
};

export default NavExam;
