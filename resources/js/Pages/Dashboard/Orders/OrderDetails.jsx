import React from "react";
import { OrderSummeryCard } from "../../../components/Orders/OrderSummeryCard";
import EmployeeOverView from "../../../components/Orders/EmployeeOverView";
import ActivityLogTable from "../../../components/Orders/ActivityLogTable";
import Dashboard from "../../../layouts/Dashboard";

const logs = [
    { time: "10:02 AM", action: "Claimed 10 files", user: "Alice" },
    { time: "10:04 AM", action: "Completed file img_023.png", user: "Alice" },
    { time: "10:15 AM", action: "Claimed 20 files", user: "Bob" },
];

export default function OrderDetails({ order, employeeStats }) {
    return (
        <Dashboard>
            <div className="p-6">
                <div>
                    <OrderSummeryCard order={order} />
                </div>
                <div className="mt-12">
                    <EmployeeOverView
                        employeeStats={employeeStats}
                        logs={logs}
                    />
                </div>
                <div className="mt-12">
                    <ActivityLogTable logs={logs} />
                </div>
            </div>
        </Dashboard>
    );
}
