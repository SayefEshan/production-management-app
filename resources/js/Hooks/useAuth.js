import { usePage } from "@inertiajs/react";

export default function useAuth() {
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const roles = auth?.roles || [];

    return {
        user,
        roles,
        isAdmin: roles.includes("admin"),
        isEmployee: roles.includes("employee"),
        hasRole: (role) => roles.includes(role),
    };
}
