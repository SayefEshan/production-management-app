import React from "react";
import Dashboard from "../../../layouts/Dashboard";
import ClaimFilesTable from "../../../components/Orders/ClaimFilesTable";

export default function ClaimFiles({ files, order }) {
    return (
        <Dashboard>
            <div className="mt-12">
                <ClaimFilesTable order={order} files={files} />
            </div>
        </Dashboard>
    );
}
