import React, { useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import FilePreviewModal from "../../../components/Files/FilePreviewModal";

const FileManager = ({ folders }) => {
    const { folders: structuredFolders } = folders;

    const fileInputs = useRef({});
    const [collapsed, setCollapsed] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewName, setPreviewName] = useState("");

    const handleFileChange = (folderId, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        router.post(`/folders/${folderId}/files`, formData, {
            preserveScroll: true,
        });
    };

    const handleFileDelete = (fileId) => {
        if (confirm("Are you sure you want to delete this file?")) {
            router.post(route("files.delete", fileId));
        }
    };
    const handleFolderDelete = (folderId) => {
        if (
            confirm(
                "Are you sure you want to delete this folder and files inside it?"
            )
        ) {
            router.post(route("folder.delete", folderId));
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
                    <td>{folder.orderId}</td>
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
                        <button
                            className="text-red-600 ml-2"
                            onClick={() => handleFolderDelete(folder.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                {!isCollapsed &&
                    folder?.files?.map((file) => (
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
                                <button
                                    className="text-green-600 mr-2"
                                    onClick={() => {
                                        setPreviewUrl(`/files/${file.id}/view`);
                                        setPreviewName(file.name);
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    className="text-red-600"
                                    onClick={() => handleFileDelete(file.id)}
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
                            {structuredFolders.map((folder) =>
                                renderRows(folder)
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            {previewUrl && (
                <FilePreviewModal
                    previewName={previewName}
                    previewUrl={previewUrl}
                    setPreviewName={setPreviewName}
                    setPreviewUrl={setPreviewUrl}
                />
            )}
        </div>
    );
};

export default FileManager;
