import React from 'react';

import store from '../../api/state/store.js';
import SubjectForm from '../components/SubjectForm.js';
import SubjectsList from '../containers/SubjectsListContainer.js';


class SubjectsPage extends React.Component {
  componentDidMount() {
    return store.dispatch({ type: 'CHANGE_TITLE', text: 'Subjects' });
  }

  render() {
    return (
      <div className="container">
        <SubjectForm />
        <SubjectsList />
      </div>
    );
  }
}

export default SubjectsPage;
