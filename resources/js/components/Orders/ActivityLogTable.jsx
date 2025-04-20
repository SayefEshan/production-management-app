import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
export default function ActivityLogTable({ logs }) {
    return (
        <>
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6"
                >
                    <Typography variant="h6" color="white">
                        Recent Activity Logs
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Timestamp", "Action", "Employee"].map(
                                    (el, key) => (
                                        <th
                                            key={`${el}-${key}`}
                                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(({ time, action, user }, key) => {
                                const className = `py-3 px-5 ${
                                    key === logs.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                }`;

                                return (
                                    <tr key={`${time}-${key}`}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    {time}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                {action}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                {user}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
}
