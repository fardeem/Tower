import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import App from '../App.js';

const AppContainer = createContainer(() => {
  const subs = [
    Meteor.subscribe('subjects'),
    Meteor.subscribe('teachers'),
  ];

  return {
    ready: subs[0].ready() && subs[1].ready(),
  };
}, App);

export default AppContainer;
