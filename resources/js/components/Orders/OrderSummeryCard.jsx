import React from "react";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Progress,
} from "@material-tailwind/react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export const OrderSummeryCard = ({ order }) => {
    const {
        id,
        order_number,
        createdBy,
        createdAt,
        totalFiles,
        claimedFiles,
        completedFiles,
        inProgressFiles,
        unclaimedFiles,
        completion,
        status,
    } = order;

    const markAsCompletedHandler = () => {
        if (confirm("Are you sure you want to mark this order as completed?")) {
            router.post(route("order.markAsCompleted", id));
        }
    };

    return (
        <>
            <Card className="shadow-md">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Order Number: {order_number}
                    </Typography>
                    <Typography variant="small">
                        Created By: {createdBy}
                    </Typography>
                    <Typography variant="small">
                        Created At: {createdAt}
                    </Typography>
                    <Typography variant="small">
                        Total Files: {totalFiles}
                    </Typography>
                    <Typography variant="small">
                        Claimed Files: {claimedFiles}
                    </Typography>
                    <Typography variant="small">
                        Completed Files: {completedFiles}
                    </Typography>
                    <Typography variant="small">
                        In-Progress Files: {inProgressFiles}
                    </Typography>
                    <Typography variant="small">
                        Unclaimed Files: {unclaimedFiles}
                    </Typography>
                    <Typography variant="small">Status: {status}</Typography>

                    <div className="mt-4">
                        <Progress value={completion} className="h-2" />
                        <Typography variant="small" className="mt-1">
                            {completedFiles} completed out of {totalFiles}
                        </Typography>
                    </div>

                    <Button
                        color="green"
                        disabled={completedFiles !== totalFiles}
                        className="mt-4"
                        onClick={() => {
                            markAsCompletedHandler();
                        }}
                    >
                        Mark as Completed
                    </Button>
                </CardBody>
            </Card>
        </>
    );
};
