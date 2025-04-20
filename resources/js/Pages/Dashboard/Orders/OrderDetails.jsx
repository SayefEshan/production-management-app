import React from "react";
import { OrderSummeryCard } from "../../../components/Orders/OrderSummeryCard";
import EmployeeOverView from "../../../components/Orders/EmployeeOverView";
import ActivityLogTable from "../../../components/Orders/ActivityLogTable";

const orderData = {
    id: 4321,
    createdBy: "Admin John",
    createdAt: "April 18, 2025",
    totalFiles: 145,
    completedFiles: 73,
    inProgressFiles: 30,
    unclaimedFiles: 42,
    status: "In Progress",
};

const employees = [
    {
        name: "Alice",
        claimed: 20,
        completed: 15,
        inProgress: 5,
        lastActivity: "5 min ago",
    },
    {
        name: "Bob",
        claimed: 30,
        completed: 28,
        inProgress: 2,
        lastActivity: "2 min ago",
    },
];

const logs = [
    { time: "10:02 AM", action: "Claimed 10 files", user: "Alice" },
    { time: "10:04 AM", action: "Completed file img_023.png", user: "Alice" },
    { time: "10:15 AM", action: "Claimed 20 files", user: "Bob" },
];

export default function OrderDetails({ order }) {
    const progress = (orderData.completedFiles / orderData.totalFiles) * 100;

    return (
        <div className="p-6">
            <div>
                <OrderSummeryCard orderData={orderData} progress={progress} />
            </div>
            <div className="mt-12">
                <EmployeeOverView employees={employees} logs={logs} />
            </div>
            <div className="mt-12">
                <ActivityLogTable logs={logs} />
            </div>
        </div>
    );
}
