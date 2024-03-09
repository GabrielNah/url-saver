import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../../customHooks/useAuthContext";

const GuestLayout = () => {

    const user = useAuthContext()

    return user ? <Navigate to={"/dashboard"}/> : <Outlet/>

};

export default GuestLayout;
