import { useState, useRef, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import useAuth from "../../Hooks/useAuth";
const ActionDropDown = ({ onView, onEdit, onDelete, onClaimFiles }) => {
    const { isAdmin, isEmployee } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-blue-gray-600 hover:text-black"
            >
                <EllipsisVerticalIcon className="h-5 w-5" />
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white shadow-lg border">
                    {isAdmin && (
                        <ul className="text-sm text-gray-700">
                            <li>
                                <button
                                    onClick={() => {
                                        onView();
                                        setOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                >
                                    Details
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        onDelete();
                                        setOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600"
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    )}
                    {isEmployee && (
                        <ul className="text-sm text-gray-700">
                            <li>
                                <button
                                    onClick={() => {
                                        onView();
                                        setOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                >
                                    Details
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        onClaimFiles();
                                        setOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                >
                                    claim files
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionDropDown;
