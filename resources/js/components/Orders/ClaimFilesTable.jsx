import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { projectsTableData } from "@/data/projectsTableData";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export function ClaimFilesTable({ files, order }) {
    const onClaimFilesHandler = (fileIds) => {
        router.post(
            route("claim-files", {
                order_id: order.id,
                file_ids: [fileIds],
            })
        );
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
                        Unclaimed Files - {order.order_number}
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "File Name",
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
                            {files.map(
                                (
                                    { id, file_name, status, created_at },
                                    key
                                ) => {
                                    const className = `py-3 px-5 ${
                                        key === projectsTableData.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={id}>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    {file_name ?? "N/A"}
                                                </Typography>
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
                                                <div className="flex gap-2">
                                                    <Typography
                                                        as="a"
                                                        href="#"
                                                        className="text-xs font-semibold text-blue-600"
                                                    >
                                                        view
                                                    </Typography>
                                                    <Typography
                                                        as="a"
                                                        href="#"
                                                        className="text-xs font-semibold text-green-600"
                                                        onClick={() =>
                                                            onClaimFilesHandler(
                                                                id
                                                            )
                                                        }
                                                    >
                                                        Claim
                                                    </Typography>
                                                </div>
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

export default ClaimFilesTable;
