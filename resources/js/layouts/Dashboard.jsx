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
import useAuth from "../Hooks/useAuth";

const icon = {
    className: "w-5 h-5 text-inherit",
};
export function Dashboard({ children }) {
    const { isAdmin } = useAuth();

    const [openSidenav, setOpenSidenav] = useState(true);
    const routes = [
        {
            title: "Dashboard",
            layout: "dashboard", // becomes part of the path like `/dashboard/overview`
            pages: isAdmin
                ? [
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
                          name: "Files Manager",
                          icon: <TableCellsIcon {...icon} />,
                          path: "/files",
                      },
                      {
                          name: "Employees",
                          icon: <TableCellsIcon {...icon} />,
                          path: "/users",
                      },
                      {
                          name: "Activity Logs",
                          icon: <TableCellsIcon {...icon} />,
                          path: "/logs",
                      },
                  ]
                : [
                      {
                          name: "Orders",
                          icon: <TableCellsIcon {...icon} />,
                          path: "/orders",
                      },
                      {
                          name: "Files Manager",
                          icon: <TableCellsIcon {...icon} />,
                          path: "/files",
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
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
