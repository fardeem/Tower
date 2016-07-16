import { createContainer } from 'meteor/react-meteor-data';

import { Sessions } from '../../api/models/sessions.js';
import { Subjects } from '../../api/models/subjects.js';
import SessionsList from '../components/SessionsList.js';


const SessionsListContainer = createContainer(({ day, grade, examStartTime }) => {
  const mapSessionToSubject = (data) => {
    const session = data;
    session.sessionId = data._id;
    delete session._id;

    return Object.assign(
      {},
      Subjects.findOne({ _id: data.subjectId, grade }),
      session
    );
  };

  const subjects = Sessions.find({ day })
    .map(mapSessionToSubject)
    .filter(({ _id }) => !! _id)
    .sort((a, b) => a.startTime > b.startTime);

  return { subjects, examStartTime };
}, SessionsList);

export default SessionsListContainer;
