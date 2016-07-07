import React from 'react';
import { Link } from 'react-router';

import PageSearch from '../containers/PageSearchContainer.js';


const Header = ({ pageTitle, secondaryNav }) => (
  <div className="page-lead">
    <div className="container">
      <header className="header">
        <Link to="/">Tower Logo</Link>

        <nav className="nav">
          <Link to="/" className="nav__item">Exams</Link>
          <Link to="/subjects" className="nav__item">Subjects</Link>
          <Link to="/teachers" className="nav__item">Teachers</Link>
        </nav>
      </header>

      <h3 className="page-title">{pageTitle}</h3>

      {secondaryNav === 'search' ? <PageSearch /> : false}
    </div>
  </div>
);

Header.propTypes = {
  pageTitle: React.PropTypes.string,
  secondaryNav: React.PropTypes.string,
};

export default Header;
