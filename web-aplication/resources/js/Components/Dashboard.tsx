import React from 'react';
import useAuthContext from "../customHooks/useAuthContext";

const Dashboard = () => {
    const user = useAuthContext()


    return (
        <div>
            <button>

            </button>
            Dashboard {JSON.stringify(user)}
        </div>
    );
};

export default Dashboard;
