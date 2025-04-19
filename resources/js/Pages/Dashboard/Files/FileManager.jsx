import React, { useRef, useState } from "react";
import { router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const FileManager = ({ folders }) => {
    const fileInputs = useRef({});
    const [collapsed, setCollapsed] = useState({});

    const handleFileChange = (folderId, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        router.post(`/folders/${folderId}/files`, formData, {
            preserveScroll: true,
        });
    };

    const handleDelete = (fileId) => {
        if (confirm("Are you sure you want to delete this file?")) {
            router.delete(`/files/${fileId}`, { preserveScroll: true });
        }
    };

    const toggleCollapse = (folderId) => {
        setCollapsed((prev) => ({
            ...prev,
            [folderId]: !prev[folderId],
        }));
    };

    const renderRows = (folder, level = 0) => {
        const isCollapsed = collapsed[folder.id];

        return (
            <React.Fragment key={folder.id}>
                <tr className="bg-gray-100">
                    <td
                        className="py-2 px-5 font-semibold"
                        style={{
                            paddingLeft: `${level === 0 ? 20 : level * 60}px`,
                        }}
                    >
                        {folder.children.length > 0 && (
                            <button
                                onClick={() => toggleCollapse(folder.id)}
                                className="mr-2 text-xs bg-gray-300 px-2 rounded"
                            >
                                {isCollapsed ? "+" : "-"}
                            </button>
                        )}
                        📁 {folder.name}
                    </td>
                    <td className="px-5">{folder.orderId}</td>
                    <td></td>
                    <td></td>
                    <td>
                        <input
                            type="file"
                            hidden
                            ref={(el) => (fileInputs.current[folder.id] = el)}
                            onChange={(e) => handleFileChange(folder.id, e)}
                        />
                        <button
                            className="text-blue-600"
                            onClick={() =>
                                fileInputs.current[folder.id].click()
                            }
                        >
                            Add File
                        </button>
                    </td>
                </tr>
                {!isCollapsed &&
                    folder.files.map((file) => (
                        <tr key={file.id}>
                            <td
                                className="py-2"
                                style={{
                                    paddingLeft: `${
                                        level === 0 ? 50 : level * 60
                                    }px`,
                                }}
                            >
                                ↳
                            </td>
                            <td className="py-2">{folder.orderId}</td>
                            <td className="py-2">{file.name}</td>
                            <td className="py-2">{file.uploaded_at}</td>
                            <td className="py-2">
                                <a
                                    href={`/files/${file.id}/view`}
                                    target="_blank"
                                    className="text-green-600 mr-2"
                                >
                                    View
                                </a>
                                <button
                                    className="text-red-600"
                                    onClick={() => handleDelete(file.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                {!isCollapsed &&
                    folder.children.map((child) =>
                        renderRows(child, level + 1)
                    )}
            </React.Fragment>
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
                        File Manager
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "Folder",
                                    "Order ID",
                                    "File",
                                    "Upload",
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
                            {folders.map((folder) => renderRows(folder))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default FileManager;
