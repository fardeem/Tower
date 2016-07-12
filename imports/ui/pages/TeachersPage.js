import React, { Component } from 'react';


// import Timing from '../components/Timing.js';
import store from '../../api/state/store.js';
import TeacherForm from '../components/TeacherForm.js';
import TeachersList from '../containers/TeachersListContainer.js';

class TeachersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    return store.dispatch({ type: 'CHANGE_TITLE', text: 'Teachers' });
  }

  render() {
    return (
      <div className="container">
        <TeacherForm />
        <TeachersList />
      </div>
    );
  }
}


export default TeachersPage;
