import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Store from '../api/state/store.js';

import AppContainer from '../ui/containers/AppContainer.js';
import SubjectsPage from '../ui/pages/SubjectsPage.js';
import TeachersPage from '../ui/pages/TeachersPage.js';
import ExamsPage from '../ui/containers/ExamsPageContainer.js';

import Routine from '../ui/components/Routine.js';


const Rooms = () => (
  <p>ROOMS PAGE</p>
);

export const renderRoutes = () => (
  <Provider store={Store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="subjects" component={SubjectsPage} />
        <Route path="teachers" component={TeachersPage} />

        <Route path="exams/:examId" component={ExamsPage} >
          <IndexRoute component={Routine} />
          <Route path="rooms" component={Rooms} />
        </Route>

      </Route>
    </Router>
  </Provider>
);
