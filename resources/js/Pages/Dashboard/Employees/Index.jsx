import React from "react";
import Dashboard from "@/layouts/Dashboard";
import EmployeeTable from "../../../components/Employees/EmployeeTable";
export default function Index() {
    return (
        <>
            <Dashboard>
                <div className="mt-12">
                    <EmployeeTable></EmployeeTable>
                </div>
            </Dashboard>
        </>
    );
}
