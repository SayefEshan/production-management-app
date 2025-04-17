import React from "react";
import { Head } from "@inertiajs/react";
import { Dashboard } from "@/layouts/dashboard";
import { OrderTable } from "./OrderTable";

export default function Index(props) {
    console.log("Index component props:", props);

    // Make sure to destructure the orders properly
    // If orders is nested inside a data property from Inertia
    const { orders } = props;

    console.log("Orders being passed to OrderTable:", orders);

    return (
        <Dashboard>
            <Head title="Orders" />
            <OrderTable orders={orders} pagination={orders?.links} />
        </Dashboard>
    );
}
