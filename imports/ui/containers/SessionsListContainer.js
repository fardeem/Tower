import { createContainer } from 'meteor/react-meteor-data';

import { Sessions } from '../../api/models/sessions.js';
import { Subjects } from '../../api/models/subjects.js';
import SessionsList from '../components/SessionsList.js';


const SessionsListContainer = createContainer(({ day, grade, examStartTime }) => {
  const mapSessionToSubject = (data) => {
    const { _id, subjectId, room, startTime, endTime } = data;

    return Object.assign(
      {},
      Subjects.findOne({ _id: subjectId, grade }),
      { sessionId: _id, room, startTime, endTime }
    );
  };

  const subjects = Sessions.find({ day })
    .map(mapSessionToSubject)
    .filter(({ _id }) => !! _id)
    .sort((a, b) => a.startTime > b.startTime);

  return { subjects, examStartTime };
}, SessionsList);

export default SessionsListContainer;
