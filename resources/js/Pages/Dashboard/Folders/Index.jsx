import React from "react";
import Table from "@/components/Orders/Table";
import Dashboard from "@/layouts/Dashboard";
export default function Index() {
    return (
        <>
            <Dashboard>
                <div className="mt-12">
                    <Table></Table>
                </div>
            </Dashboard>
        </>
    );
}
