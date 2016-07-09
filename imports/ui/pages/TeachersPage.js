import React, { Component } from 'react';


// import Timing from '../components/Timing.js';
import store from '../../api/state/store.js';
import C from '../components/SubjectPicker.js';

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
      <div>
        <form>
          <C onChange={(v) => console.log(v)} selected={['y2eCJhkMN4HXuEkXJ']} />
        </form>
      </div>
    );
  }
}


export default TeachersPage;
