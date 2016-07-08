import React, { Component } from 'react';


import Timing from '../components/Timing.js';

class TeachersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  didStateUpdate(state) {
    console.log(state);
  }

  render() {
    return (
      <div>
        <Timing onChange={this.didStateUpdate} />
      </div>
    );
  }
}


export default TeachersPage;
