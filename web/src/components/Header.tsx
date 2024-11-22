import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/strava_logo.png';
import { RootState } from '../store/store';
import api from "../api";
import {AuthResponse} from "../types";
import {login as loginAction, logout as logoutAction} from "../store/authSlice";

export const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // const handleSynckClick = (e) => {
  //   e.preventDefault();
  //   const checkAuth = async () => {
  //         try {
  //           const response = await api.post<AuthResponse>('/v1/start-syncing/');
  //           console.log(response)
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       };
  //       checkAuth();
  // }

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {isAuthenticated ? (
          <>
            <Navbar.Link as="div" active={true}>
              <Link to="/">Dashboard</Link>
            </Navbar.Link>
            <Navbar.Link as="div">
              <Link to="/activities">Activities</Link>
            </Navbar.Link>
            {/*<Navbar.Link as="div">*/}
            {/*  <a href="" onClick={handleSynckClick}>Sync Activities</a>*/}
            {/*</Navbar.Link>*/}
            <Navbar.Link as="div">
              <Link to="/logout">Logout</Link>
            </Navbar.Link>
          </>
        ) : (
          <Navbar.Link as="div">
            <Link to="/">Home</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
