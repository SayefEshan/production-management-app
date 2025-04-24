import React from "react";
import Dashboard from "../../../layouts/Dashboard";
import ClaimedFilesTable from "../../../components/Employees/ClaimedFilesTable";

export default function ClaimedFiles({ files }) {
    return (
        <Dashboard>
            <div className="mt-12">
                <ClaimedFilesTable files={files} />
            </div>
        </Dashboard>
    );
}
