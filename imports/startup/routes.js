import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from '../api/state/store.js';
import AppContainer from '../ui/containers/AppContainer.js';
import SubjectsPage from '../ui/pages/SubjectsPage.js';


export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="subjects" component={SubjectsPage} />
      </Route>
    </Router>
  </Provider>
);
