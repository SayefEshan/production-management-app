import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Progress,
} from "@material-tailwind/react";
import { projectsTableData } from "@/data/projectsTableData";
import ActionDropDown from "./ActionDropDown";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export function Tables({ orders }) {
    const onViewHandler = (orderId) => {
        router.get(route("order.show", orderId));
    };
    const onEditHandler = (orderId) => {
        console.log("edit");
        // router.put(route("order.edit", orderId));
    };
    const onDeleteHandler = (orderId) => {
        if (confirm("Are you sure you want to delete this order?")) {
            router.post(route("order.delete", orderId));
        }
    };

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
                            {orders.map(
                                (
                                    {
                                        id,
                                        order_number,
                                        status,
                                        title,
                                        created_at,
                                        completion,
                                    },
                                    key
                                ) => {
                                    const className = `py-3 px-5 ${
                                        key === projectsTableData.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={order_number}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="text-xs font-semibold text-blue-gray-600"
                                                    >
                                                        {order_number}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    {title ?? "N/A"}
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
                                                    {new Date(
                                                        created_at
                                                    ).toLocaleDateString()}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    {status}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <ActionDropDown
                                                    onView={() =>
                                                        onViewHandler(id)
                                                    }
                                                    onEdit={() =>
                                                        onEditHandler(id)
                                                    }
                                                    onDelete={() =>
                                                        onDeleteHandler(id)
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
