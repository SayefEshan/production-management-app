import DashboardLayout from "../../layouts/Dashboard";
import Home from "./Home";
const Dashboard = ({ data }) => {
    return (
        <>
            <DashboardLayout>
                <Home data={data} />
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
