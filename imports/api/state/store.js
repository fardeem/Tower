import { createStore, combineReducers } from 'redux';

import {
  pageTitle,
  secondaryNav,
  pageSearch,
  examsPageSettings } from './reducer.js';


const rootReducers = combineReducers({
  pageTitle,
  secondaryNav,
  pageSearch,
  examsPageSettings,
});

const store = createStore(rootReducers, {},
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
