import { Head } from "@inertiajs/react";
import React from "react";
import Table from "@/components/Orders/Table";
import Dashboard from "@/layouts/Dashboard";
export default function Index() {
    return (
        <>
            <Dashboard>
                <Table></Table>
            </Dashboard>
        </>
    );
}
