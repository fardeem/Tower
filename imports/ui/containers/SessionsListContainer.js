import { createContainer } from 'meteor/react-meteor-data';

import { Sessions } from '../../api/models/sessions.js';
import { Subjects } from '../../api/models/subjects.js';
import SessionsList from '../components/SessionsList.js';


const SessionsListContainer = createContainer(({ day, grade, startTime }) => {
  const subjects = Sessions.find({ day })
    .map(({ subjectId, room }) => (
      Object.assign({}, Subjects.findOne({ _id: subjectId, grade }), { room })
    )).filter(({ _id }) => !! _id);

  return { subjects, startTime };
}, SessionsList);

export default SessionsListContainer;
