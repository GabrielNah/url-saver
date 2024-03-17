import React from 'react';
import useAuthContext from "../customHooks/useAuthContext";
import Collections from "@/Partials/Dashboard/Collections";

const Dashboard = () => {

    const user = useAuthContext()


    return (
        <div>
            <Collections/>

        </div>
    );
};

export default Dashboard;
