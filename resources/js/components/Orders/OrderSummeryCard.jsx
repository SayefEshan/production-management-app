import React from "react";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Progress,
} from "@material-tailwind/react";

export const OrderSummeryCard = ({ orderData, progress }) => {
    return (
        <>
            <Card className="shadow-md">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Order #{orderData.id}
                    </Typography>
                    <Typography variant="small">
                        Created By: {orderData.createdBy}
                    </Typography>
                    <Typography variant="small">
                        Created At: {orderData.createdAt}
                    </Typography>
                    <Typography variant="small">
                        Total Files: {orderData.totalFiles}
                    </Typography>
                    <Typography variant="small">
                        Status: {orderData.status}
                    </Typography>

                    <div className="mt-4">
                        <Progress value={progress} className="h-2" />
                        <Typography variant="small" className="mt-1">
                            {orderData.completedFiles} completed out of{" "}
                            {orderData.totalFiles}
                        </Typography>
                    </div>

                    <Button
                        color="green"
                        disabled={
                            orderData.completedFiles !== orderData.totalFiles
                        }
                        className="mt-4"
                    >
                        Mark as Completed
                    </Button>
                </CardBody>
            </Card>
        </>
    );
};
