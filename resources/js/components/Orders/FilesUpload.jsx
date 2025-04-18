import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const FilesUpload = () => {
    const [folders, setFolders] = useState([
        {
            id: uuidv4(),
            name: "Root Folder",
            parentId: null,
            children: [],
            files: [],
        },
    ]);

    const handleAddFolder = (parentId) => {
        const newFolder = {
            id: uuidv4(),
            name: "New Folder",
            parentId,
            children: [],
            files: [],
        };

        const addFolderRecursive = (nodes) => {
            return nodes.map((node) => {
                if (node.id === parentId) {
                    return {
                        ...node,
                        children: [...node.children, newFolder],
                    };
                }
                return {
                    ...node,
                    children: addFolderRecursive(node.children),
                };
            });
        };

        setFolders((prev) => addFolderRecursive(prev));
    };

    const handleFilesChange = (folderId, newFiles) => {
        const updateFilesRecursive = (nodes) => {
            return nodes.map((node) => {
                if (node.id === folderId) {
                    return { ...node, files: newFiles };
                }
                return {
                    ...node,
                    children: updateFilesRecursive(node.children),
                };
            });
        };

        setFolders((prev) => updateFilesRecursive(prev));
    };

    const handleRenameFolder = (folderId, newName) => {
        const updateFolderNameRecursive = (nodes) => {
            return nodes.map((node) => {
                if (node.id === folderId) {
                    return { ...node, name: newName };
                }
                return {
                    ...node,
                    children: updateFolderNameRecursive(node.children),
                };
            });
        };

        setFolders((prev) => updateFolderNameRecursive(prev));
    };

    const handleRemoveFolder = (folderId) => {
        const removeFolderRecursive = (nodes) => {
            return nodes
                .filter((node) => node.id !== folderId)
                .map((node) => ({
                    ...node,
                    children: removeFolderRecursive(node.children),
                }));
        };

        setFolders((prev) => removeFolderRecursive(prev));
    };

    const renderFolders = (nodes) => {
        return nodes.map((folder) => (
            <div key={folder.id} className="border p-4 my-2 rounded bg-gray-50">
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        value={folder.name}
                        onChange={(e) =>
                            handleRenameFolder(folder.id, e.target.value)
                        }
                        className="font-semibold border-none bg-transparent"
                    />
                    <div className="py-4 flex space-x-2">
                        <button
                            type="button"
                            onClick={() => handleAddFolder(folder.id)}
                            className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Add Subfolder
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRemoveFolder(folder.id)}
                            className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Remove Folder
                        </button>
                    </div>
                </div>

                <FilePond
                    files={folder.files}
                    onupdatefiles={(fileItems) => {
                        handleFilesChange(
                            folder.id,
                            fileItems.map((fileItem) => fileItem.file)
                        );
                    }}
                    allowMultiple={true}
                    maxFiles={null}
                    name="files"
                    labelIdle="Drag & Drop files or <span class='filepond--label-action'>Browse</span>"
                />

                {folder.children.length > 0 && (
                    <div className="ml-4 mt-2">
                        {renderFolders(folder.children)}
                    </div>
                )}
            </div>
        ));
    };

    const handleSubmit = () => {
        console.log("Submitting folders:", folders);
        // Send to Inertia.post("/orders", folders)
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="space-y-4">{renderFolders(folders)}</div>
        </div>
    );
};

export default FilesUpload;
