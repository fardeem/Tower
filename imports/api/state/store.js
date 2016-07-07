import { createStore, combineReducers } from 'redux';

import { pageTitle, secondaryNav, pageSearch } from './reducer.js';


const rootReducers = combineReducers({
  pageTitle,
  secondaryNav,
  pageSearch,
});

const store = createStore(rootReducers, {},
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
