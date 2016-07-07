import { connect } from 'react-redux';
import Header from '../components/Header.js';


const mapStateToProps = (state) => ({
  pageTitle: state.pageTitle,
  secondaryNav: state.secondaryNav,
});

const HeaderContainer = connect(
  mapStateToProps
)(Header);

export default HeaderContainer;
