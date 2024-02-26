import React from 'react';
import {Route,Routes,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";
import Login from "@/Login";

const RouteList = () => {

    return (
        <RouterProvider router={createBrowserRouter(createRoutesFromElements(
                <Route path={"/"} element={<Login/>}>
                    <Route path={"/login"} element={<Login/>}/>
                </Route>
        ))}/>
    );
};

export default RouteList;
