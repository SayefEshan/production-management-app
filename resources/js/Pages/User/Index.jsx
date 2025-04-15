import { Head } from "@inertiajs/react";
import React from "react";
export default function Index({ user }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="p-6">
                <h1 className="text-2xl mb-4">Welcome</h1>
                <p>Hello {user?.name || 'Guest'}, welcome to your first Inertia app!</p>
            </div>
        </>
    );
}
