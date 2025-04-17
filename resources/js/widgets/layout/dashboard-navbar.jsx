import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";

export function DashboardNavbar() {
    const [fixedNavbar, setFixedNavbar] = useState(true); // You can control this however you want
    const [openSidenav, setOpenSidenav] = useState(false);
    const [openConfigurator, setOpenConfigurator] = useState(false);

    // Use Inertia's usePage to get the current URL.
    const { url } = usePage();
    // url should be a string such as "/dashboard/overview"
    const pathname = url || "";
    const [layout, page] = pathname.split("/").filter((el) => el !== "");

    return (
        <Navbar
            color="transparent" // Set to transparent to let custom class take over
            className={`rounded-xl transition-all ${
                fixedNavbar
                    ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 bg-gradient-to-br from-gray-800 to-gray-900"
                    : "px-0 py-1"
            }`}
            fullWidth
            blurred={false} // Set to false so it doesn't interfere with custom background
        >
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                <div className="capitalize">
                    <Breadcrumbs
                        className={`bg-transparent p-0 transition-all ${
                            fixedNavbar ? "mt-1" : ""
                        }`}
                    >
                        <Link href={`/${layout}`}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                            >
                                {layout}
                            </Typography>
                        </Link>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {page}
                        </Typography>
                    </Breadcrumbs>
                    <Typography variant="h6" color="blue-gray">
                        {page}
                    </Typography>
                </div>
                <div className="flex items-center">
                    <div className="mr-auto md:mr-4 md:w-56">
                        <Input label="Search" />
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => setOpenSidenav(!openSidenav)}
                    >
                        <Bars3Icon
                            strokeWidth={3}
                            className="h-6 w-6 text-blue-gray-500"
                        />
                    </IconButton>
                    <Link href="/auth/sign-in">
                        <Button
                            variant="text"
                            color="blue-gray"
                            className="hidden items-center gap-1 px-4 xl:flex normal-case"
                        >
                            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                            Sign In
                        </Button>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            className="grid xl:hidden"
                        >
                            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                        </IconButton>
                    </Link>
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                                <BellIcon className="h-5 w-5 text-blue-gray-500" />
                            </IconButton>
                        </MenuHandler>
                        <MenuList className="w-max border-0">
                            <MenuItem className="flex items-center gap-3">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New message</strong> from Laur
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 13
                                        minutes ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New album</strong> by Travis
                                        Scott
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 1
                                        day ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                                    <CreditCardIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        Payment successfully completed
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 2
                                        days ago
                                    </Typography>
                                </div>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => setOpenConfigurator(true)}
                    >
                        <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
                    </IconButton>
                </div>
            </div>
        </Navbar>
    );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
