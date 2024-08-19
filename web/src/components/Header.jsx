import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <header>
            <Navbar fluid={true} rounded={true}>
                <Navbar.Brand href="/">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite
            </span>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Navbar.Link as="div" active={true}>
                        <Link to='/'>
                            Dashboard
                        </Link>
                    </Navbar.Link>
                    { isAuthenticated ?
                    <Navbar.Link as="div">
                        <Link to='/activities'>
                            Activities
                        </Link>
                    </Navbar.Link> :
                    null
                    }
                    <Navbar.Link as="div">
                        <Link to='/signup'>
                            SignUp
                        </Link>
                    </Navbar.Link>
                    { isAuthenticated ?
                    <Navbar.Link as="div">
                        <Link to='/logout'>
                            Logout
                        </Link>
                    </Navbar.Link>
                    :
                    <Navbar.Link as="div">
                        <Link to='strava/login/'>
                            Strava Login
                        </Link>
                    </Navbar.Link>
                    }
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header