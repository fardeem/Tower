import { connect } from 'react-redux';

import ExamNav from '../components/ExamNav.js';


const ExamsNavContainer = connect(
  ({ examsPageSettings }) => ({ id: examsPageSettings.id })
)(ExamNav);

export default ExamsNavContainer;
