import { Head } from "@inertiajs/react";
import React from "react";
import Table from "@/components/Orders/Table";
import Dashboard from "@/layouts/Dashboard";
import { Button } from "@material-tailwind/react";
export default function Index() {
    return (
        <>
            <Dashboard>
                <div className="mt-12 flex justify-end">
                    <Button variant="gradient">Create Order</Button>
                </div>
                <Table></Table>
            </Dashboard>
        </>
    );
}
