import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    InformationCircleIcon,
    ServerStackIcon,
    RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Sidenav, DashboardNavbar } from "@/widgets/layout";

const icon = {
    className: "w-5 h-5 text-inherit",
};
export function Dashboard({ children }) {
    const [openSidenav, setOpenSidenav] = useState(true);
    const routes = [
        {
            title: "Dashboard",
            layout: "dashboard", // becomes part of the path like `/dashboard/overview`
            pages: [
                {
                    name: "dashboard",
                    icon: <HomeIcon {...icon} />,
                    path: "/",
                },
                {
                    name: "Orders",
                    icon: <TableCellsIcon {...icon} />,
                    path: "/orders",
                },
                {
                    name: "Folders",
                    icon: <TableCellsIcon {...icon} />,
                    path: "/folders",
                },
                {
                    name: "Files",
                    icon: <TableCellsIcon {...icon} />,
                    path: "/files",
                },
            ],
        },
        // {
        //     title: "Settings",
        //     layout: "dashboard",
        //     pages: [
        //         {
        //             name: "Profile",
        //             // icon: <UserIcon className="h-5 w-5" />,
        //             path: "/profile",
        //         },
        //         {
        //             name: "Notifications",
        //             // icon: <BellIcon className="h-5 w-5" />,
        //             path: "/notifications",
        //         },
        //     ],
        // },
    ];

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav
                routes={routes}
                openSidenav={openSidenav}
                setOpenSidenav={setOpenSidenav}
                brandName="My App"
                sidenavType="dark"
                sidenavColor="blue"
            />
            <div className="p-4 xl:ml-80">
                <DashboardNavbar />
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
