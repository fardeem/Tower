import { createContainer } from 'meteor/react-meteor-data';

import { Subjects } from '../../api/models/subjects.js';
import SubjectsList from '../components/SubjectsList.js';

const SubjectsListContainer = createContainer(() => ({
  subjects: Subjects.find().fetch(),
}), SubjectsList);

export default SubjectsListContainer;

