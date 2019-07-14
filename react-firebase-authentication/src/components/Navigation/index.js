import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Logo from "../../img/survey.png";


import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";





const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);




// const NavigationNonAuth = () => (
//   <ul>
//     <li>
//       <Link to={ROUTES.LANDING}>Welcome</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//     </li>
//   </ul>
// );






class NavigationNonAuth extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
      <img  src={Logo} alt="Logo" width="50" height= "30" />

        {/* <strong className="white-text">MMR</strong> */}
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to={ROUTES.LANDING}>Welcome</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={ROUTES.SIGN_IN}>Sign In</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            {/* <MDBNavLink to="#!">Pricing</MDBNavLink> */}
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

export default Navigation;














