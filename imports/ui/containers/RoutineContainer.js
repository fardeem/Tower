import { createContainer } from 'meteor/react-meteor-data';

import Routine from '../components/Routine.js';
import { Exams } from '../../api/models/exams.js';


const RoutineContainer = createContainer(() => (
  Exams.findOne() || {}
), Routine);

export default RoutineContainer;
