import { Navbar } from 'flowbite-react';

export const Header = () => {
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
                    <Navbar.Link href="/" active={true}>
                        Dashboard
                    </Navbar.Link>
                    <Navbar.Link href="/activities" active={true}>
                        Activities
                    </Navbar.Link>
                    <Navbar.Link href="/signup">
                        SignUp
                    </Navbar.Link>
                    <Navbar.Link href="/login">
                        Login
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header