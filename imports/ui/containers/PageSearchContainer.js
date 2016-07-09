import { connect } from 'react-redux';

import PageSearch from '../components/PageSearch.js';


const mapDispatchToProps = (dispatch) => ({
  handleChange({ target }) {
    return dispatch({ type: 'CHANGE_SEARCH_TEXT', text: target.value });
  },
});

const PageSearchContainer = connect(
  ({ pageSearch }) => ({ pageSearch }),
  mapDispatchToProps
)(PageSearch);

export default PageSearchContainer;
