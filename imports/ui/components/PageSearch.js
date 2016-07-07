import React from 'react';


const PageSearch = ({ handleChange }) => (
  <div className="search">
    <span>icon</span>
    <input type="text" placeholder="Search" onChange={handleChange} />
  </div>
);

PageSearch.propTypes = {
  handleChange: React.PropTypes.func,
};

export default PageSearch;
