import React from 'react';

import Header from './containers/HeaderContainer.js';


const App = ({ children }) => (
  <main>
    <Header />
    <div className="page-wrap">
      {children}
    </div>
  </main>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
