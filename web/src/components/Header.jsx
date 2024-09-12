import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/strava_logo.png';

export const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {isAuthenticated ? (
          <Navbar.Link as="div" active={true}>
            <Link to="/">Dashboard</Link>
          </Navbar.Link>
        ) : null}
        {isAuthenticated ? (
          <Navbar.Link as="div">
            <Link to="/activities">Activities</Link>
          </Navbar.Link>
        ) : null}
        {isAuthenticated ? (
          <Navbar.Link as="div">
            <Link to="/logout">Logout</Link>
          </Navbar.Link>
        ) : (
          <Navbar.Link as="div">
            <Link to="strava/login/">Strava Login</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
