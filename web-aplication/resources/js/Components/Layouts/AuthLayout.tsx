import React from 'react';
import useAuthContext from "@js/customHooks/useAuthContext";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Show from "@/Toolkit/Show";
import $http from "@utils/$http"
import {removeAccessToken} from "@utils/AuthService";
import {AxiosResponse} from "axios";

const AuthLayout = () => {

    const user = useAuthContext()
    const navigateTO = useNavigate()

    const logout = ()=>{
        $http.instance().post("/logout")
            .then(({data:{success}}:AxiosResponse<{success:boolean}>)=>{
                if (!success){
                    throw new Error("Something went wrong.")
                }

                removeAccessToken()
                $http.reInit()
                navigateTO("/login")
            })
    }
    return <Show>
                <Show.When isTrue={!user} >
                    <Navigate to={"/login"}/>
                </Show.When>

                <Show.Else>
                    <div>
                        <div>
                            <button onClick={logout}>
                                Log out
                            </button>
                        </div>
                        <Outlet context={{user:user}} />
                    </div>
                </Show.Else>



           </Show>
};

export default AuthLayout;
