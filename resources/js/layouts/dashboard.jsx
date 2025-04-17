import { useState } from "react";
import { Sidenav, DashboardNavbar } from "@/widgets/layout";

export function Dashboard() {
    const [openSidenav, setOpenSidenav] = useState(true);
    const routes = [
        {
            title: "Dashboard",
            layout: "dashboard", // becomes part of the path like `/dashboard/overview`
            pages: [
                {
                    name: "Overview",
                    // icon: <HomeIcon className="h-5 w-5" />, // any JSX icon
                    path: "/overview", // this gets combined with layout
                },
                {
                    name: "Reports",
                    // icon: <ChartBarIcon className="h-5 w-5" />,
                    path: "/reports",
                },
            ],
        },
        {
            title: "Settings",
            layout: "dashboard",
            pages: [
                {
                    name: "Profile",
                    // icon: <UserIcon className="h-5 w-5" />,
                    path: "/profile",
                },
                {
                    name: "Notifications",
                    // icon: <BellIcon className="h-5 w-5" />,
                    path: "/notifications",
                },
            ],
        },
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
            </div>
        </div>
    );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
