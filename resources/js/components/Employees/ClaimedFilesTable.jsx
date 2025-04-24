import React from "react";
import {
    Card,
    CardBody,
    Typography,
    CardHeader,
} from "@material-tailwind/react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ClaimedFilesTable({ files }) {
    const viewHanlder = (fileId) => {};

    const updateHandler = (fileId) => {
        const fullUrl = route("files.update", fileId);
        console.log(fullUrl);

        router.post(fullUrl, {
            status: "in_progress",
        });
    };

    return (
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    Claimed Files Overview
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {[
                                "File Name",
                                "Order Number",
                                "Status",
                                "claimed_at",
                                "Actions",
                            ].map((el, key) => (
                                <th
                                    key={`${el}-${key}`} // eslint-disable-line react/no-array-indexkey}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, idx) => {
                            const className = `py-3 px-5 ${
                                idx === files.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                            }`;

                            return (
                                <tr key={idx}>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {file.file_name}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {file.order.order_number}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {file.status}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {new Date(
                                                file.claimed_at
                                            ).toLocaleDateString()}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <div className="flex flex-row gap-2">
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="text-xs font-semibold text-blue-600"
                                                onClick={(e) => {
                                                    viewHanlder(file.id);
                                                }}
                                            >
                                                view
                                            </Typography>
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="text-xs font-semibold text-green-600"
                                                onClick={(e) => {
                                                    updateHandler(file.id);
                                                }}
                                            >
                                                update
                                            </Typography>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
