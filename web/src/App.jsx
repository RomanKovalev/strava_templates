import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    Sidebar,
    Card,
} from "flowbite-react";
import {HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards} from "react-icons/hi";
import stravaLogo from "../src/assets/strava_logo.png"


export function App() {
    return (
        <>
            <Navbar fluid rounded border={true} >
                <NavbarBrand href="https://flowbite-react.com">
                    <img src={stravaLogo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo"/>
                    <span
                        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">statistics</span>
                </NavbarBrand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings"
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded/>
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </DropdownHeader>
                        <DropdownItem>Dashboard</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Earnings</DropdownItem>
                        <DropdownDivider/>
                        <DropdownItem>Sign out</DropdownItem>
                    </Dropdown>
                    <NavbarToggle/>
                </div>
                <NavbarCollapse>
                    <NavbarLink href="#" active>
                        Home
                    </NavbarLink>
                    <NavbarLink href="#">About</NavbarLink>
                    <NavbarLink href="#">Services</NavbarLink>
                    <NavbarLink href="#">Pricing</NavbarLink>
                    <NavbarLink href="#">Contact</NavbarLink>
                </NavbarCollapse>
            </Navbar>
            <div className="flex flex-1 mt-1">
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
                                Kanban
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiInbox} label="3">
                                Inbox
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiShoppingBag}>
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
                    <Card className="mx-auto shadow w-full ml-1 mr-1 col-span-2 p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800" />
                    <Card className="mx-auto shadow w-full ml-1 mr-1 p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800" />
                </div>
            </div>
        </>
    );
}

export default App
