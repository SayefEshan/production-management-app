import React from "react";
import Dashboard from "@/layouts/Dashboard";
import FileManager from "./FileManager";
export default function Index({ structuredOrders }) {
    return (
        <>
            <Dashboard>
                <div className="mt-12">
                    <FileManager folders={structuredOrders[0]} />
                </div>
            </Dashboard>
        </>
    );
}
