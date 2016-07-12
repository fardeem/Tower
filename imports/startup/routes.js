import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from '../api/state/store.js';
import AppContainer from '../ui/containers/AppContainer.js';
import SubjectsPage from '../ui/pages/SubjectsPage.js';
import TeachersPage from '../ui/pages/TeachersPage.js';
import RoutinePage from '../ui/pages/RoutinePage.js';


function clearState() {
  return store.dispatch({ type: 'CHANGE_SEARCH_TEXT', text: '' });
}

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="subjects" component={SubjectsPage} onLeave={clearState} />
        <Route path="teachers" component={TeachersPage} onLeave={clearState} />
        <Route path="exams/:examId" component={RoutinePage} />
      </Route>
    </Router>
  </Provider>
);
