import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import { Subjects } from '../../api/models/subjects.js';
import SubjectsList from '../components/SubjectsList.js';


const SubjectsListContainer = createContainer(({ pageSearch }) => {
  let query = {};
  query = pageSearch.trim() ? { name: new RegExp(`^${pageSearch}`, 'gi') } : {};

  return {
    subjects: Subjects.find(query).fetch(),
  };
}, SubjectsList);

export default connect(
  ({ pageSearch }) => ({ pageSearch })
)(SubjectsListContainer);
