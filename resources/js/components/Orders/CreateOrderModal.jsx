import React from "react";
import {
    Input,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import FilesUpload from "./FilesUpload";

export function CreateOrderModal({ open, handleOpen }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        folders: [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("order.create"));
    }

    return (
        <>
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        Create Order
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody className="space-y-4 pb-6">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Title
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder="eg. first order"
                                name="name"
                                className="placeholder:opacity-100 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                        </div>
                        {errors.title && <div>{errors.title}</div>}
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 text-left font-medium"
                            >
                                Description (Optional)
                            </Typography>
                            <Textarea
                                rows={2}
                                placeholder="eg. This is a white shoes with a comfortable sole."
                                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                        </div>
                        {errors.description && <div>{errors.description}</div>}
                        <FilesUpload setData={setData} />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            className="ml-auto"
                            variant="gradient"
                            color="gray"
                            type="submit"
                            disabled={processing}
                        >
                            Save Order
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
