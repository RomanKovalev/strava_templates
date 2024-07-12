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

import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react";

export function App() {
    return (
        <>
            <Navbar fluid rounded border={true}>
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
                    {/*<NavbarLink href="#" active>*/}
                    {/*    Home*/}
                    {/*</NavbarLink>*/}
                    {/*<NavbarLink href="#">About</NavbarLink>*/}
                    {/*<NavbarLink href="#">Services</NavbarLink>*/}
                    {/*<NavbarLink href="#">Pricing</NavbarLink>*/}
                    {/*<NavbarLink href="#">Contact</NavbarLink>*/}
                </NavbarCollapse>
            </Navbar>
            <div className="flex flex-1 mt-1">
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                            {/*<Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">*/}
                            {/*    Kanban*/}
                            {/*</Sidebar.Item>*/}
                            {/*<Sidebar.Item href="#" icon={HiInbox} label="3">*/}
                            {/*    Inbox*/}
                            {/*</Sidebar.Item>*/}
                            {/*<Sidebar.Item href="#" icon={HiUser}>*/}
                            {/*    Users*/}
                            {/*</Sidebar.Item>*/}
                            {/*<Sidebar.Item href="#" icon={HiShoppingBag}>*/}
                            {/*    Products*/}
                            {/*</Sidebar.Item>*/}
                            <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-5 mb-4 pr-2">
                    <Card
                        className="col-span-3 w-full shadow p-4 ml-1 bg-white border border-gray-200 rounded-lg sm:shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold">Most recent activities</h3>
                        <Table hoverable>
                            <TableHead>
                                <TableHeadCell></TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                            </TableHead>
                            <TableBody className="divide-y">
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        11-07-24
                                    </TableCell>
                                    <TableCell>Zone 2 in Watopia</TableCell>
                                    <TableCell>38km</TableCell>
                                    <TableCell>59m</TableCell>
                                    <TableCell>1:05:10</TableCell>
                                    <TableCell>151w</TableCell>
                                    <TableCell>34.7km/h</TableCell>
                                    <TableCell>149</TableCell>
                                    <TableCell>565kcal</TableCell>
                                </TableRow>
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        11-07-24
                                    </TableCell>
                                    <TableCell>Zone 2 in Watopia</TableCell>
                                    <TableCell>38km</TableCell>
                                    <TableCell>59m</TableCell>
                                    <TableCell>1:05:10</TableCell>
                                    <TableCell>151w</TableCell>
                                    <TableCell>34.7km/h</TableCell>
                                    <TableCell>149</TableCell>
                                    <TableCell>565kcal</TableCell>
                                </TableRow>
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">11-07-24</TableCell>
                                    <TableCell>Zone 2 in Watopia</TableCell>
                                    <TableCell>38km</TableCell>
                                    <TableCell>59m</TableCell>
                                    <TableCell>1:05:10</TableCell>
                                    <TableCell>151w</TableCell>
                                    <TableCell>34.7km/h</TableCell>
                                    <TableCell>149</TableCell>
                                    <TableCell>565kcal</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                    <Card
                        className="col-span-2 shadow mr-1 w-full p-4 bg-white border border-gray-200 rounded-lg ml-1 sm:mr-0 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Since I began cycling 1 year and 4 months ago on 27-03-2023, I had 366 cycling days.
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            I recorded a total distance of
                            14 336 km (0.36 trips around the world 🌍 and 0.037 trips to the moon 🌕), an elevation of
                            97 104 m (11.0 times Mount Everest 🏔) and a total time of 2w 6d 15h 7m 🎉.
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">That's a daily average of 30 km, a
                            weekly average of 211 km and a monthly average of 896
                            km 🐣.
                            I burned 289 740 calories doing so, that's about 1 073 pizza slices 🍕.
                        </p>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default App
