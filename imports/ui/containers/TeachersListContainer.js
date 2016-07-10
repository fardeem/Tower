import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import { Teachers } from '../../api/models/teachers.js';
import TeachersList from '../components/TeachersList.js';


const TeachersListContainer = createContainer(({ pageSearch }) => {
  let query = {};
  query = pageSearch.trim() ? { name: new RegExp(`^${pageSearch}`, 'gi') } : {};

  if (pageSearch.indexOf('is-parttime') > -1) {
    query.parttime = true;
    delete query.name;
  }

  return {
    teachers: Teachers.find(query).fetch(),
  };
}, TeachersList);

export default connect(
  ({ pageSearch }) => ({ pageSearch })
)(TeachersListContainer);
