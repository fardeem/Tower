import React from 'react';


const PageSearch = ({ pageSearch, handleChange }) => (
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

PageSearch.propTypes = {
  pageSearch: React.PropTypes.string,
  handleChange: React.PropTypes.func,
};

export default PageSearch;
