import React from 'react';
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";
import Login from "@/Login";
import Register from "@/Register";
import UserFetcher from "@/Middlewares/UserFetcher";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import Dashboard from "@/Dashboard";

const RouteList = () => {

    return (
        <RouterProvider router={createBrowserRouter(createRoutesFromElements(
                <Route path={"/"} element={<UserFetcher/>} >

                    <Route path={"/"} element={<GuestLayout/>}>

                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>

                    </Route>

                    <Route path={"/"} element={<AuthLayout/>}>

                        <Route path={"/dashboard"} element={<Dashboard/>}/>

                    </Route>

                </Route>
        ))}/>
    );
};

export default RouteList;
