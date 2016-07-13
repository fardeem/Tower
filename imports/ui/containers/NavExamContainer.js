import { connect } from 'react-redux';

import NavExam from '../components/NavExam.js';


const NavExamContainer = connect(
  ({ examsPageSettings }) => ({ id: examsPageSettings.id })
)(NavExam);

export default NavExamContainer;
