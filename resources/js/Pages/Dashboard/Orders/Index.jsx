import React from "react";
import useAuth from "../../../Hooks/useAuth";
import Table from "@/components/Orders/Table";
import Dashboard from "@/layouts/Dashboard";
import { Button } from "@material-tailwind/react";
import { CreateOrderModal } from "../../../components/Orders/CreateOrderModal";
export default function Index({ orders }) {
    const { isAdmin } = useAuth();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Dashboard>
                <div className="mt-12 mb-12 flex justify-end">
                    {isAdmin && (
                        <Button variant="gradient" onClick={handleOpen}>
                            Create Order
                        </Button>
                    )}
                    {isAdmin && (
                        <CreateOrderModal open={open} handleOpen={handleOpen} />
                    )}
                </div>
                <Table orders={orders}></Table>
            </Dashboard>
        </>
    );
}
