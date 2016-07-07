import React from 'react';

import store from '../../api/state/store.js';
import SubjectForm from '../components/SubjectForm.js';
import { Subjects } from '../../api/models/subjects.js';


class SubjectsPage extends React.Component {
  componentDidMount() {
    return [
      store.dispatch({ type: 'CHANGE_TITLE', text: 'Subjects' }),
      store.dispatch({ type: 'CHANGE_NAV', text: 'search' }),
    ];
  }

  render() {
    return (
      <SubjectForm />
    );
  }
}

export default SubjectsPage;
