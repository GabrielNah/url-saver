import React from 'react';
import {Route,Routes,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";
import Login from "@/Login";
import Register from "@/Register";

const RouteList = () => {

    return (
        <RouterProvider router={createBrowserRouter(createRoutesFromElements(
                <Route path={"/"} >
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                </Route>
        ))}/>
    );
};

export default RouteList;
