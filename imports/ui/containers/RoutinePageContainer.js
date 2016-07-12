import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import RoutinePage from '../pages/RoutinePage.js';


const RoutinePageContainer = createContainer(({ params }) => {
  const sub = Meteor.subscribe('exams', params.examId);

  return {
    ready: sub.ready(),
  };
}, RoutinePage);

export default RoutinePageContainer;
