import React from "react";
import {
    Card,
    CardBody,
    Typography,
    CardHeader,
} from "@material-tailwind/react";

export default function EmployeeTable({ employees }) {
    return (
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    Employees
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {[
                                "Employee",
                                "File Name",
                                "Order ID",
                                "Status",
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
                        {employees.flatMap((emp) =>
                            emp.files.map((file, idx) => {
                                const className = `py-3 px-5 ${
                                    idx === emp.files.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                }`;

                                return (
                                    <tr key={`${emp.id}-${idx}`}>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                {emp.name}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                {file.name}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                {file.orderId}
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
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
