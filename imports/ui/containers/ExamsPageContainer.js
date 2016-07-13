import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Store from '../../api/state/store.js';
import { Exams } from '../../api/models/exams.js';
import ExamsPage from '../pages/ExamsPage.js';


const ExamsPageContainer = createContainer(({ params }) => {
  const { examId } = params;
  const sub = Meteor.subscribe('exams', examId);
  const exam = Exams.findOne({});

  Store.dispatch({ type: 'CHANGE_TITLE', text: exam ? exam.name : '' });
  Store.dispatch({ type: 'CHANGE_NAV', text: 'exam-nav' });
  Store.dispatch({ type: 'CHANGE_EXAM_ID', payload: { id: examId } });

  return {
    ready: sub.ready(),
  };
}, ExamsPage);

export default ExamsPageContainer;
