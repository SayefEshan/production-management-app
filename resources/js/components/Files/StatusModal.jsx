import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Select,
    Option,
} from "@material-tailwind/react";

const StatusModal = ({ modalOpen, onClose, updateHandler, file }) => {
    const [status, setStatus] = useState("in_progress");

    const handleSubmit = () => {
        updateHandler(file.id, status);
        onClose(); // Close the modal after submitting
    };

    return (
        <Dialog open={modalOpen} handler={onClose}>
            <DialogHeader>{file?.file_name}</DialogHeader>
            <DialogBody>
                <div className="w-full">
                    <Select
                        label="Select Status"
                        value={file?.status}
                        onChange={(val) => setStatus(val)}
                    >
                        <Option value="in_progress">In Progress</Option>
                        <Option value="completed">Completed</Option>
                        <Option value="pending">Pending</Option>
                    </Select>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="gray"
                    onClick={onClose}
                    className="mr-2"
                >
                    Cancel
                </Button>
                <Button variant="filled" color="blue" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default StatusModal;
