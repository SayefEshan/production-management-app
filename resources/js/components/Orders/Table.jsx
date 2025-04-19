import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { projectsTableData } from "@/data/projectsTableData";
import ActionDropDown from "./ActionDropDown";

export function Tables() {
    return (
        <div className="mt-4 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6"
                >
                    <Typography variant="h6" color="white">
                        Orders Table
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "Order ID",
                                    "Title",
                                    "completion",
                                    "Created At",
                                    "Status",
                                    "Actions",
                                ].map((el) => (
                                    <th
                                        key={el}
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
                            {projectsTableData.map(
                                (
                                    { img, name, members, budget, completion },
                                    key
                                ) => {
                                    const className = `py-3 px-5 ${
                                        key === projectsTableData.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={name}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="text-xs font-semibold text-blue-gray-600"
                                                    >
                                                        Order ID
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Order Title
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <div className="w-10/12">
                                                    <Typography
                                                        variant="small"
                                                        className="mb-1 block text-xs font-medium text-blue-gray-600"
                                                    >
                                                        {completion}%
                                                    </Typography>
                                                    <Progress
                                                        value={completion}
                                                        variant="gradient"
                                                        color={
                                                            completion === 100
                                                                ? "green"
                                                                : "gray"
                                                        }
                                                        className="h-1"
                                                    />
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    2025-04-19
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Pending
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <ActionDropDown
                                                    onView={() =>
                                                        console.log(
                                                            "View clicked"
                                                        )
                                                    }
                                                    onEdit={() =>
                                                        console.log(
                                                            "Edit clicked"
                                                        )
                                                    }
                                                    onDelete={() =>
                                                        console.log(
                                                            "Delete clicked"
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default Tables;
