import React from 'react';


const NavSearch = ({ pageSearch, handleChange }) => (
  <div className="search">
    <span>icon</span>
    <input
      type="text"
      value={pageSearch}
      placeholder="Search"
      onChange={handleChange}
    />
  </div>
);

NavSearch.propTypes = {
  pageSearch: React.PropTypes.string,
  handleChange: React.PropTypes.func,
};

export default NavSearch;
