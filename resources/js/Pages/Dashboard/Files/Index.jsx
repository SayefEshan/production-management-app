import React from "react";
import Table from "@/components/Orders/Table";
import Dashboard from "@/layouts/Dashboard";
import FileManager from "./FileManager";

const folders = [
    {
        id: 1,
        orderId: 1001,
        name: "Root Folder",
        files: [
            {
                id: 101,
                name: "file1.jpg",
                uploaded_at: "2025-04-19",
            },
        ],
        children: [
            {
                id: 2,
                orderId: 1001,
                name: "Subfolder A",
                files: [
                    {
                        id: 102,
                        name: "image2.png",
                        uploaded_at: "2025-04-19",
                    },
                ],
                children: [],
            },
        ],
    },
    {
        id: 2,
        orderId: 1002,
        name: "second order Root Folder",
        files: [
            {
                id: 102,
                name: "file1.jpg",
                uploaded_at: "2025-04-19",
            },
        ],
        children: [
            {
                id: 3,
                orderId: 1002,
                name: "Subfolder A",
                files: [
                    {
                        id: 103,
                        name: "image2.png",
                        uploaded_at: "2025-04-19",
                    },
                ],
                children: [],
            },
        ],
    },
];

export default function Index() {
    return (
        <>
            <Dashboard>
                <div className="mt-12">
                    <FileManager folders={folders} />
                </div>
            </Dashboard>
        </>
    );
}
