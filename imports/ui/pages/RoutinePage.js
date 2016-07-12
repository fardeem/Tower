import React from 'react';

import store from '../../api/state/store.js';
import Routine from '../components/Routine.js';

class RoutinePage extends React.Component {
  componentDidMount() {
    return store.dispatch({ type: 'CHANGE_TITLE', text: 'Final Exams 2016' });
  }

  render() {
    return (
      <div>
        <Routine />
      </div>
    );
  }
}

export default RoutinePage;
