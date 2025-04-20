import PropTypes from "prop-types";
import { Link, usePage } from "@inertiajs/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";

export function Sidenav({
    brandName,
    routes,
    openSidenav,
    setOpenSidenav,
    sidenavType = "dark",
    sidenavColor = "blue",
}) {
    const { url } = usePage(); // Inertia's current route

    const sidenavTypes = {
        dark: "bg-gradient-to-br from-gray-800 to-gray-900",
        white: "bg-white shadow-sm",
        transparent: "bg-transparent",
    };

    const isActive = (match) => {
        const normalized = url.split("?")[0]; // ignore query string
        const normalizedUrl = normalized.replace(/\/+$/, ""); // remove trailing slashes
        const normalizedMatch = match.replace(/\/+$/, ""); // remove trailing slashes

        return (
            normalizedUrl === normalizedMatch ||
            normalizedUrl.startsWith(`${match}/`)
        );
    };

    return (
        <aside
            className={`${sidenavTypes[sidenavType]} ${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
        >
            <div className="relative">
                <Link href="/" className="py-6 px-8 text-center">
                    <Typography
                        variant="h6"
                        color={sidenavType === "dark" ? "white" : "blue-gray"}
                    >
                        {brandName}
                    </Typography>
                </Link>
                <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    ripple={false}
                    className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                    onClick={() => setOpenSidenav(false)}
                >
                    <XMarkIcon
                        strokeWidth={2.5}
                        className="h-5 w-5 text-white"
                    />
                </IconButton>
            </div>

            <div className="m-4">
                {routes.map(({ layout, title, pages }, key) => (
                    <ul key={key} className="mb-4 flex flex-col gap-1">
                        {title && (
                            <li className="mx-3.5 mt-4 mb-2">
                                <Typography
                                    variant="small"
                                    color={
                                        sidenavType === "dark"
                                            ? "white"
                                            : "blue-gray"
                                    }
                                    className="font-black uppercase opacity-75"
                                >
                                    {title}
                                </Typography>
                            </li>
                        )}
                        {pages.map(({ icon, name, path }) => {
                            const fullPath = `/${layout}${path}`;

                            return (
                                <li key={name}>
                                    <Link href={fullPath} className="block">
                                        <Button
                                            variant={
                                                isActive(fullPath)
                                                    ? "gradient"
                                                    : "text"
                                            }
                                            color={
                                                isActive(fullPath)
                                                    ? sidenavColor
                                                    : sidenavType === "dark"
                                                    ? "white"
                                                    : "blue-gray"
                                            }
                                            className="flex items-center gap-4 px-4 capitalize"
                                            fullWidth
                                        >
                                            {icon}
                                            <Typography
                                                color="inherit"
                                                className="font-medium capitalize"
                                            >
                                                {name}
                                            </Typography>
                                        </Button>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ))}
            </div>
        </aside>
    );
}

Sidenav.defaultProps = {
    brandImg: "/img/logo-ct.png",
    brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
    brandImg: PropTypes.string,
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    openSidenav: PropTypes.bool.isRequired,
    setOpenSidenav: PropTypes.func.isRequired,
    sidenavType: PropTypes.oneOf(["dark", "white", "transparent"]),
    sidenavColor: PropTypes.string,
};

Sidenav.displayName = "/resources/js/Layouts/Sidenav.jsx";

export default Sidenav;
