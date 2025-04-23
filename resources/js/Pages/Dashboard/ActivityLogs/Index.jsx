import React from "react";
import Dashboard from "../../../layouts/Dashboard";
import ActivityLogsTable from "../../../components/ActivityLogs/ActivityLogsTable";

export default function Index({ activityLogs }) {
    return (
        <>
            <Dashboard>
                <div className="mt-12">
                    <ActivityLogsTable activityLogs={activityLogs} />
                </div>
            </Dashboard>
        </>
    );
}
