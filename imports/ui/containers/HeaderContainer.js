import { connect } from 'react-redux';
import Header from '../components/Header.js';


const HeaderContainer = connect(
  ({ pageTitle, secondaryNav }) => ({ pageTitle, secondaryNav })
)(Header);

export default HeaderContainer;
