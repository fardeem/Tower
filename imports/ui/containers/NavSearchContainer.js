import { connect } from 'react-redux';

import NavSearch from '../components/NavSearch.js';


const mapDispatchToProps = (dispatch) => ({
  handleChange({ target }) {
    return dispatch({ type: 'CHANGE_SEARCH_TEXT', text: target.value });
  },
});

const NavSearchContainer = connect(
  ({ pageSearch }) => ({ pageSearch }),
  mapDispatchToProps
)(NavSearch);

export default NavSearchContainer;
