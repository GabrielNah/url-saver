import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../../customHooks/useAuthContext";

const backgroundStyles = {
    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,110,1) 25%, rgba(0,212,255,1) 100%)"
}
const GuestLayout = () => {

    const user = useAuthContext()

    return user ? <Navigate to={"/dashboard"}/> : (<div style={backgroundStyles} className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
                                                                <Outlet/>
                                                    </div>)

};

export default GuestLayout;
