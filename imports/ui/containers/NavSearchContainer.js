import { connect } from 'react-redux';

import NavSearch from '../components/NavSearch.js';


const NavSearchContainer = connect(
  ({ pageSearch }) => ({ pageSearch }),
  (dispatch) => ({
    handleChange({ target }) {
      return dispatch({ type: 'CHANGE_SEARCH_TEXT', text: target.value });
    },
  })
)(NavSearch);

export default NavSearchContainer;
