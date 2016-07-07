import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import App from '../App.js';

const AppContainer = createContainer(() => {
  const subs = Meteor.subscribe('subjects');
  return {
    loading: subs.ready(),
  };
}, App);

export default AppContainer;
